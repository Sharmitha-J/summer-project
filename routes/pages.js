const express =require("express");
const router = express.Router();
const userController=require("../controllers/users");

router.get(["/","/login"],(req,res)=>{
    res.render("index_log");
  });
  
  router.get("/sign",(req,res)=>{
      //res.render("index_sign");
      res.render("index_sign");
    });
  
    router.get("/profile",userController.isLoggedIn,(req,res)=>{
      if(req.user){
        res.render("index_pro",{user:req.user});

      }else{
        res.redirect("/login");
      }
    });
  
    router.get("/about",(req,res)=>{
      res.render("index_about");
    });
    
    router.get("/english",userController.isLoggedIn,(req,res)=>{
      if(req.user){
        res.render("index_e",{user:req.user});

      }else{
        res.redirect("/login");
      }
      });
    
      router.get("/emaths",userController.isLoggedIn,(req,res)=>{
        if(req.user){
          res.render("index_em",{user:req.user});

        }else{
          res.redirect("/login");
        }
      });
  
      router.get("/escience",userController.isLoggedIn,(req,res)=>{
        if(req.user){
          res.render("index_es",{user:req.user});

        }else{
          res.redirect("/login");
        }
        });
        
        router.get("/esocial",userController.isLoggedIn,(req,res)=>{
          if(req.user){
            res.render("index_ess",{user:req.user});

          }else{
            res.redirect("/login");
          }
          });
        
          router.get("/feedback",(req,res)=>{
            res.render("index_f");
          });
  
          router.get("/home",(req,res)=>{
            //console.log(req.name);
            
              res.render("index_home");

            
              
            });
          
            router.get("/tamil",userController.isLoggedIn,(req,res)=>{
              if(req.user){
                res.render("index_t",{user:req.user});
  
              }else{
                res.redirect("/login");
              }
            });

            router.get("/trans",userController.isLoggedIn,(req,res)=>{
              if(req.user){
                res.render("index_translate",{user:req.user});
  
              }else{
                res.redirect("/login");
              }
            });
        
            router.get("/tmaths",userController.isLoggedIn,(req,res)=>{
              if(req.user){
                res.render("index_tm",{user:req.user});
  
              }else{
                res.redirect("/login");
              }
              });
              
              router.get("/tscience",userController.isLoggedIn,(req,res)=>{
                  res.render("index_ts");
                });
              
                router.get("/tsocial",userController.isLoggedIn,(req,res)=>{
                  if(req.user){
                    res.render("index_tss",{user:req.user});
      
                  }else{
                    res.redirect("/login");
                  }
                });  
  
                router.get("/tsubject",userController.isLoggedIn,(req,res)=>{
                  if(req.user){
                    res.render("index_tsub",{user:req.user});
      
                  }else{
                    res.redirect("/login");
                  }
                });
              
                router.get("/esubject",userController.isLoggedIn,(req,res)=>{
                  if(req.user){
                    res.render("index_esub",{user:req.user});
      
                  }else{
                    res.redirect("/login");
                  }
                });
  




module.exports=router;