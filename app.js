const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser')
const fs=require('fs')
const XMLHttpRequest = require("xmlhttprequest");

const cookieParser = require('cookie-parser');
const session = require('express-session');


const port = 6789;
const app = express();
var sess;

app.use(session({secret:'shh', saveUninitialized:false}));
// directorul 'views' va conține fișierele .ejs (html + js executat la server)
app.set('view engine', 'ejs');
// suport pentru layout-uri - implicit fișierul care reprezintă template-ul site-ului este views/layout.ejs
app.use(expressLayouts);
// directorul 'public' va conține toate resursele accesibile direct de către client (e.g., fișiere css, javascript, imagini)
app.use(express.static('public'))
// corpul mesajului poate fi interpretat ca json; datele de la formular se găsesc în format json în req.body
app.use(bodyParser.json());
// utilizarea unui algoritm de deep parsing care suportă obiecte în obiecte
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// la accesarea din browser adresei http://localhost:6789/ se va returna textul 'Hello World'
// proprietățile obiectului Request - req - https://expressjs.com/en/api.html#req
// proprietățile obiectului Response - res - https://expressjs.com/en/api.html#res

var mysql = require('mysql');
var o={
	host: "localhost",
	user: "malina",
	password: "malina",
	insecureAuth:true,
	database:'olive',
  };
  var con = mysql.createConnection(o);

		con.connect(function(err) {
			if (err) throw err;
			console.log("Connected!");
			/*con.query("CREATE DATABASE olive", function (err, result) {
				if (err) throw err;
				console.log("Database created");
			  });
			var sql = "CREATE TABLE produse(id VARCHAR(255), name VARCHAR(255), price VARCHAR(255), imagine VARCHAR(255))";
			con.query(sql, function (err, result) {
			  if (err) throw err;
			  console.log("Table created");
			});
            var sql = "INSERT INTO produse (id, name, price, imagine) VALUES ?";
			var values = [
			  [ '1','Cana 00', '9' ,'/cana.jpg'],
			  [ '2','Cana 01', '9' ,'/cana2.jpg'],
			  [ '3','Cana 02', '7' ,'/cana3.jpg'],
			  [ '4','Cana 03', '8' ,'/cana4.jpg'],
			  [ '5','Cana 04', '7' ,'/cana5.jpg'],
			  [ '6','Cana 05', '8' ,'/cana6.jpg'],
			  [ '7','Cana 06', '15' ,'/canacuplu.jpg'],
			  [ '8','Perna 00', '12' ,'/perna_suprema.jpg'],  
			  [ '9','Perna 01', '8' ,'/perna.jpg'],
			  [ '10','Perna 02', '9' ,'/perna2.jpg'],
			  [ '11','Perna 03', '10' ,'/perna3.jpg'],
			  [ '12','Prosop 00', '7' ,'/prosop.jpg'],
			  [ '13','Prosop 01', '8' ,'/prosop2.jpg'],
		      [ '14','Set prosop+furculita', '15' ,'/set.png'],
			  [ '15','Șosete 00', '6' ,'/sosete.jpg'],
			  [ '16','Șosete 01', '7' ,'/sosete1.jpg'],
			  [ '17','Șosete 02', '8' ,'/sosete2.jpg'],
			  [ '18','Șosete 03', '7' ,'/sosete3.jpg'],
			  [ '19','Șosete 04', '7' ,'/sosete4.jpg'],
			[ '20','Tricou 00', '15' ,'/A.jpg'],
			[ '21','Tricou 01', '15' ,'/B.jpg'],
			[ '22','Tricou 02', '20' ,'/C.jpg'],
			[ '23','Tricou 03', '20' ,'/D.jpg'],
			[ '24','Tricou 04', '15' ,'/E.jpg'],
			[ '25','Tricou 05', '10' ,'/F.jpg'],
			[ '26','Tricou 06', '12' ,'/G.jpg'],
			[ '27','Tricou 07', '18' ,'/H.jpg'],
			[ '28','Tricou 08', '20' ,'/I.jpg'],
			[ '29','Tricou 09', '12' ,'/J.jpg'],
			[ '30','Baby shoes', '6' ,'/baby_shoes.jpg'],
			[ '31','Bag 00', '5' ,'/bag1.jpg'],
			[ '32','Bag 01', '5' ,'/bag2.jpg'],
			[ '33','Termos 00', '12' ,'/termos.jpg'],
			[ '34','Termos 01', '15' ,'/termos2.jpg'],
			[ '35','Carte 00', '20' ,'/book.jpg'],
			[ '36','Carte 01', '25' ,'/book.png'],
			[ '37','Carte 02', '20' ,'/book2.jpg'],
			[ '38','Carte 03', '20' ,'/book3.jpg'],
			[ '39','Felicitare 00', '3' ,'/felicitare.jpg'],
			[ '40','Felicitare 01', '3' ,'/felicitare1.jpg'],
			[ '41','Felicitare 02', '2.5' ,'/felicitare2.png'],
			[ '42','Felicitare 03', '3.5' ,'/felicitare3.jpg'],
			[ '43','Felicitare 04', '3' ,'/felicitare4.jpg'],
			[ '44','Felicitare 05', '2.5' ,'/felicitare5.jpg'],
			[ '45','Felicitare 06', '3' ,'/felicitare6.jpg'],
			[ '46','Hartie cadouri 00', '6' ,'/giftwrap.jpg'],
			[ '47','Hartie cadouri 01', '5' ,'/giftwrap2.jpg'],
			[ '48','Jucarie 00', '25' ,'/oliver.png'],
			[ '49','Jucarie 01', '30' ,'/olivetoy.png'],
			[ '50','Breloc', '5' ,'/breloc.png'],
			[ '51','Ceas', '80' ,'/ceas.png'],
			[ '52','Bag 01', '5' ,'/bag2.jpg'],
			[ '53','Patura 00', '30' ,'/blanket.jpg'],
			[ '54','Patura 01', '28' ,'/blanket2.jpg'],
			[ '55','Penar', '16' ,'/pencil.jpg'],
			[ '56','Insigna', '6' ,'/joke.jpg'],
			[ '57','Minge golf', '10' ,'/minge_golf.png'],
			[ '58','Minge', '25' ,'/minge.png']
		
			
		];
	   con.query(sql, [values], function (err, result) {
		   if (err) throw err;
		   console.log("Number of records inserted: " + result.affectedRows);
	   })
       */

		  });

	
app.get('/', (req, res) => res.render('home'));
app.get('/desen', (req, res) => res.render('desen'));
app.get('/joc', (req, res) => res.render('joc'));
app.get('/trivia', (req, res) => res.render('trivia'));
app.get('/galerie', (req, res) => res.render('galerie'));
app.get('/contact', (req, res) =>res.render('contact'));
app.get('/persoane', (req, res) =>res.render('persoane'));
app.get('/recenzii', (req, res) =>res.render('recenzii'));
app.get('/comanda', (req, res) =>res.render('comanda'));
//app.get('/cumparaturi', (req, res) =>res.render('cumparaturi'));


app.get('/cumparaturi', (req, res) => {
	sess = req.session;
	sess.username;
	var con = mysql.createConnection(o);
	con.connect(function(err,db){
		
			var sql = "SELECT * FROM produse";
  			con.query(sql, function (err,data,fields) {
    		console.log("aici");
			console.log(data);
			sess.id=data;
            res.render('cumparaturi',{eroare:req.cookies.mesajEroare,utilLogat:sess.username, cookie: req.cookies.utilizator,items:data});	
		});
		
			});

	
});

app.get('/autentificare',(req,res)=>{
	sess = req.session;
	res.render('autentificare',{eroare:req.cookies.mesajEroare, utilLogat:sess.username});
});	
app.post('/verificare-autentificare', (req, res) => {
	console.log("aici");
	sess = req.session;
	
	
	fs.readFile("utilizatori.json",(err,data)=>{
		console.log("aiciq");
		if(err)
		{
			console.log(err);
		}
		const listaUtilizatori = JSON.parse(data);
		console.log(listaUtilizatori);
		const nume1 = req.body.username;
	    const parola1 = req.body.pass;
		sess = req.session;
		var ok=0;
		var k;
	    for(var i=0;i<listaUtilizatori.length;i++)
		{
		  if(listaUtilizatori[i].nume==nume1 && listaUtilizatori[i].parola==parola1)
		  {
			  ok=1;
			  console.log( "1"+ok);
			  k=i;
		  }
		

		}
			if(ok==1)
			{
				sess.username = listaUtilizatori[k].utilizator;
				sess.numeUtilizator = listaUtilizatori[k].nume;
				sess.prenume = listaUtilizatori[k].prenume;
				console.log("2"+sess);
				console.log("3"+sess.username);
				res.cookie("utilizator",req.body.username,{expires:new Date(Date.now()+ 9000)});
		
				res.redirect(302,'http://localhost:6789/cumparaturi');
		
				res.end();
			}
			else if(ok==0)
			{
				res.cookie("mesajEroare","Date incorecte",{expires:new Date(Date.now()+ 9000)});
		
			    res.redirect(302,'http://localhost:6789/autentificare');
		
			    res.end();
			}
	
		
		
     });
		
});
	

app.get('/logout',(req,res)=>{

	res.cookie("utilizator","",{expires: new Date(Date.now()+1)});
	req.session.username = undefined;
	prod.splice(0, prod.length)
	res.redirect(302,"/");
});


var prod = [];

app.post('/adaugare-cos',(req,res)=>{
	
	prod.push([req.body.id,req.body.id2]);
	sess=req.session;
	sess.produse = prod;
	console.log(sess.produse)
	console.log(sess.produse[0][1])
	
	
});


app.get('/vizualizare_cos',(req,res)=>{
	sess = req.session;
	res.render('vizualizare_cos',{eroare:req.cookies.mesajEroare, utilLogat:sess.username,produse:prod});
});
	

// la accesarea din browser adresei 
 //se va apela funcția specificată
 app.get('/chestionar', (req, res) => {
	fs.readFile("intrebari.json",(err,data)=>{
		if(err)
		{
			console.log(err);
		}
		const listaIntrebari = JSON.parse(data);
		res.render('chestionar', {intrebari: listaIntrebari});
		
	});
	
	
	
});



app.post('/rezultat-chestionar', (req, res) => {
	
	var raspunsuriInput =req.body;
	console.log(raspunsuriInput);
	var count=0;
	fs.readFile("intrebari.json",(err,data)=>{
		if(err)
		{
			console.log(err);
		}
		const listaIntrebari = JSON.parse(data);
		for(var i=0;i<listaIntrebari.length;i++)
		{
			if(raspunsuriInput["q"+i] === listaIntrebari[i].variante[listaIntrebari[i].corect])
			{
				count+=1;
			}
		}
		res.render('rezultat-chestionar',{raspuns:count});
		
	});
	

});


app.listen(port, () => console.log(`Serverul rulează la adresa http://localhost:`));