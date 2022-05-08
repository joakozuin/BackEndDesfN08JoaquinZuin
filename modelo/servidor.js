const express=require('express')
const morgan=require('morgan')
const productoRuta=require('../rutas/producto')
const apiRuta = require('../rutas')


class Servidor{

  constructor(){

     this.app=express()
     this.port=process.env.PORT || '8080'

     //Middlewares
      this.app.use(morgan('dev'))
      this.app.use(express.json())
      this.app.use(express.static(process.cwd()+'\\public'))
      this.app.use(express.urlencoded({ extended: true }))

      // Ruta de la Api en http://localhost:8080/api
      // prefijo, por el tema de versiones de la API
       this.apiCaminos={
         api:'/api',
         productos:'/api/productos'
       }
       this.rutas()
       this.manErrores()
  }

   rutas(){
     this.app.use(this.apiCaminos.api,apiRuta)
     this.app.use(this.apiCaminos.productos,productoRuta)
   }
  
   manErrores(){

      this.app.use((err,req,res,next)=>{
       
        res.json({
          Mensage: 'Ha ocurrido un error',
          Error:err.message,
      
        });

         //return next()
      })

   }


   escuchando(){
      this.app.listen(this.port,()=>{
        console.log(`Servidor respondiendo en el puerto ${this.port}`)
      })
  }

}

module.exports=Servidor