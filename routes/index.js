var conn = require('./../inc/db');
var express = require('express');
var menus = require('./../inc/menus');
var reservations = require('./../inc/reservations');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next)=> {

  menus.getMenus().then(results =>{
    res.render('index', {
      title: 'Restaurante Saboroso!',
      menus: results,
      isHome: true
     });

  });

});

router.get('/contacts',function(req, res, next){
  res.render('contacts', {
    title: 'Contato - Restaurante Saboroso!',
    background: 'images/img_bg_3.jpg',
    h1: 'Diga um oi!'
  });
});

router.get('/menus',(req, res, next)=>{
 
  menus.getMenus().then(results => {
    res.render('menus', {
      title: 'Menu - Restaurante Saboroso!',
      background: 'images/img_bg_1.jpg',
      h1: 'Saboreie nosso menu!',
      menus: results
    });
  });
 

});

router.get('/reservations',(req, res, next)=>{

  reservations.render(req, res);

});


router.post('/reservetions',(req, res, next)=>{

  if (!req.body.name){
    reservations.render(req, res,'Digite o nome!' );
  }else if(!req.body.email){
    reservations.render(req, res,'Digite o Email!' );
  }else if(!req.body.people){
    reservations.render(req, res,'Selecione a quantidade de pessoas!' );
  }else if(!req.body.date){
    reservations.render(req, res,'Escolha a data!' );
  }else if(!req.body.time){
    reservations.render(req, res,'Escolha a hora!' );
  }else{

    reservations.save(req.body).then(results =>{

      req.body = {};
      reservations.render(req, res, null, "Reserva realizada com sucesso!");

    }).catch(err =>{

      reservations.render(req, res, err.message );

    });

  }
});


router.get('/services',(req, res, next)=>{
  res.render('services', {
    title: 'Serviços - Restaurante Saboroso!',
    background: 'images/img_bg_1.jpg',
    h1: 'É um prazer poder servir!'
  });
});

module.exports = router;
