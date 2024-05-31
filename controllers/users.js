const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require('axios');
const { promisify } = require("util");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE,

});

exports.log = async (req, res) => {
    try {
        //console.log(req.body);
        const { name, pass } = req.body
        if (!name || !pass) {
            return res.status(400).render('index_log', {
                msg: "Please Enter all the fields Correctly",
                msg_type: "error",
            });
        }

        db.query('select * from users where name=?', [name], async (error, result) => {
            //console.log(result);
            if (result.length <= 0) {
                return res.status(401).render('index_log', {
                    msg: "Name or Password incorrect...",
                    msg_type: "error",
                });
            } else {
                if (!(await bcrypt.compare(pass, result[0].PASS))) {
                    return res.status(401).render('index_log', {
                        msg: "Name or Password incorrect...",
                        msg_type: "error",
                    });
                } else {
                    const id = result[0].ID;
                    const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_EXPIRES_IN,
                    });
                    //console.log("The Token " +token);
                    const cookieOptions = {
                        expires: new Date(
                            Date.now() +
                            process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                        ),
                        httpOnly: true,
                    };
                    res.cookie("priya", token, cookieOptions);
                    if (result[0].LANGUAGE == "tamil medium") {
                        res.status(200).redirect("/tsubject");
                    } else {
                        res.status(200).redirect("/esubject");

                    }
                }
            }
        }
        );
    } catch (error) {
        console.log(error);
    }

};
exports.sign = (req, res) => {
    console.log(req.body);
    const { name, medium, pass } = req.body;

    db.query(
        "select name from users where name=?",
        [name],


        async (error, result) => {
            if (error) {
                confirm.log(error);
            }
            if (result.length > 0) {
                return res.render("index_sign", {
                    msg: "Name already taken",
                    msg_type: "error",
                });
            }
            let hashedPassword = await bcrypt.hash(pass, 2);
            //console.log(hashedPassword);
            db.query("insert into users set?", { name: name, language: medium, pass: hashedPassword },
                (error, result) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(result);
                        return res.render("index_sign", { msg: "Registration success" });
                    }
                });

        }
    );
};

exports.isLoggedIn = async (req, res, next) => {
    //req.name="Check Login...";

    //console.log(req.cookies);
    if (req.cookies.priya) {
        try {
            const decode = await promisify(jwt.verify)(
                req.cookies.priya,
                process.env.JWT_SECRET
            );
            console.log(decode);
            db.query("select * from users where id=?",
                [decode.id], (err, results) => {
                    // console.log(results);
                    if (!results) {
                        return next();
                    }
                    req.user = results[0];
                    return next();

                });

        } catch (error) {
            console.log(error);
            return next();
        }
    } else {
        next();
    }
};
exports.logout = async (req, res) => {
    res.cookie("priya", "logout", {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true,
    });
    res.status(200).redirect("/");
};
exports.trans = async (req, res) => {
    const { data, to } = req.body;
    var from = 'en', to_lang = 'ta'
    if(to == 'english'){
        to_lang = 'en'
        from = 'ta'
    }
    if(to == 'tamil'){
        to_lang = 'ta'
        from = 'en'
    }
    const options = {
        method: 'POST',
        url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
        params: {
            'to[0]': to_lang,
            'api-version': '3.0',
            from: from,
            profanityAction: 'NoAction',
            textType: 'plain'
        },
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '6a81f91e8emsh28a9329a2a17d37p1bc35fjsn05d0a09e82a4',
            'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
        },
        data: [
            {
                Text: data
            }
        ]
    };

    try {
        const response = await axios.request(options);
        const data = response.data;
        const text = data[0].translations[0].text;
        return res.render("index_translate", {
            msg: text,
        });
    } catch (error) {
        console.error(error);
    }
}