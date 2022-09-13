const express=require("express");
const app=express();
const bodyParser=require("body-parser");
var _ = require('lodash');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

const homeStartingContent="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

const aboutContent="Pharetra et ultrices neque ornare aenean euismod elementum nisi quis. Turpis cursus in hac habitasse platea dictumst quisque sagittis. Eget magna fermentum iaculis eu non diam. Libero enim sed faucibus turpis in eu mi bibendum neque. Bibendum at varius vel pharetra vel turpis. Massa enim nec dui nunc mattis enim ut tellus elementum. Vel pharetra vel turpis nunc eget lorem dolor sed. Id ornare arcu odio ut sem nulla pharetra diam. Ut morbi tincidunt augue interdum. Viverra orci sagittis eu volutpat odio facilisis mauris sit amet. Dignissim suspendisse in est ante in nibh. Id consectetur purus ut faucibus pulvinar. Eu sem integer vitae justo eget magna. Sed risus pretium quam vulputate dignissim suspendisse. Cras semper auctor neque vitae tempus. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida."

const contactContent="Viverra justo nec ultrices dui sapien eget mi proin sed. Non sodales neque sodales ut etiam sit amet nisl. Diam in arcu cursus euismod quis viverra nibh. A diam sollicitudin tempor id eu. A pellentesque sit amet porttitor eget. Porttitor rhoncus dolor purus non enim praesent elementum facilisis leo. Nisl pretium fusce id velit ut tortor pretium viverra. Urna et pharetra pharetra massa massa ultricies mi quis hendrerit. Ut porttitor leo a diam sollicitudin tempor id. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Arcu dui vivamus arcu felis."

const posts=[];

app.get("/", (req, res)=>{
  res.render("index", {pageTitle:"Home", homeStartingContent:homeStartingContent, posts:posts});

});

app.get("/about", (req, res)=>{
  res.render("about", {pageTitle:"About", homeStartingContent:aboutContent});
});

app.get("/contact", (req, res)=>{
  res.render("contact", {pageTitle:"Contact", homeStartingContent:contactContent});
});

app.get("/compose", (req, res)=>{
  res.render("compose");
});

app.post("/compose", (req, res)=>{
  const post={
    title:req.body.composed,
    content:req.body.blogContent
  }
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:title", (req, res)=>{
  const requestedTitle=_.lowerCase(req.params.title); //lodash method
  posts.forEach(function(element){
    if(_.lowerCase(element.title)===requestedTitle){
      res.render("blogPage", {blogTitle:element.title, blogInfo:element.content});
    }
  });
});

app.listen(process.env.PORT||3000, ()=>{
  console.log("server running...");
});
