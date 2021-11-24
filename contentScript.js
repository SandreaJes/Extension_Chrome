'use strict';
var options = {message : "",title : 'Sart 2.0.1',size : 'lg',subtitle : '',useBin : false,buttons: [
	        {text: 'Aceptar', style: 'info',   close: true, click:ctxFuntion},
	        
	    ]};
	
	var optAlternativas = {message : "",title : 'Sart 2.0.1',size : 'lg',subtitle : '',useBin : false,
	buttons: [
	        {text: 'Si', style: 'info',   close: true, click:ctxFuntion},
			{text: 'No', style: 'info',   close: true, click:ctxSalirPreRev},	        
	    ]};
		
		var optSession = {message : "",title : 'Sart 2.0.1',size : 'lg',subtitle : '',useBin : false,
	buttons: [
	        {text: 'Ok', style: 'warning',   close: true, click:ctxOutSession}
				        
	    ]};
		
	var optDanger = {message : "",title : 'Sart 2.0.1 Rechazo del Proceso',size : 'lg',subtitle : '',useBin : false,
	buttons: [
	        {text: 'Rechazo', style: 'danger',   close: true, click:ctxSalirPreRev}
				        
	    ]};	
		

		
var RecepcionSoat = new Object();
var Recepcion = new Object();
var callFuncion="";
var naturalezaRevision="";
var ctxPreRevision="";
var atrrNaturalez1;
var preventiva="N";
var fkRevision;
var cntInactivida= 0; 
var ultimaRev="NO APLICA"
var eve ="";
// can't see page-script-added properties
console.log("bendigan a Jehova oh alma mia call sessioon"); 

setTimeout(function() {evaluacionSession()},5000);

window.addEventListener("submit", (event) => {  
	if(naturalezaRevision==""){	
	   options.message="  <h2> <label class='radio-inline'> TIPO REVISION:  <select  id='natRev'> <option value='N' > RTM </option> <option value='Y'> PREVENTIVA</option> </select> </label>  </h2>  ";
	   options.subtitle="Naturaleza Revision del Vehiculo";
	   options.size='sm-2';
	   eModal.alert(options);
	   callFuncion="validarRevision";	
	}else{
		clearTimeout(evaluacionSession);	
		setTimeout(function() {evaluacionContexto()}, 5500);
	}    		
});

 
window.addEventListener("click", (event) => {    
	cntInactivida = 0;	
	//if(event.target.id=="natRev"){
	
});

	
window.addEventListener("keypress", (event) => {    
	cntInactivida = 0; 		
	console.log("detectoactividadkeypress"); 
});
function evaluacionSession(){
	var entidad = "evalStatusSession";
	console.log("voy al servidor "); 
    var cadenaAtributos, streaming = ""; 
    streaming = entidad + "|" ;			
    doAjax('https://192.168.1.10:8181/SART-WEB/ServicioBasicoControler.do', streaming, 'respEvaluacionSession','get', 0);
}
function respEvaluacionSession(resp){
	console.log("response serevidor"+resp); 	
	if(cntInactivida==15){
		clearTimeout(evaluacionSession);
	  optSession.message = "Disculpe; su Session de Usuario se ha CERRADO por Inactividad..!";
	  optSession.subtitle = " SESSION CERRADA";
	  eModal.alert(optSession);           		
	  return;
	}
	cntInactivida =  parseInt(cntInactivida)+1;
	console.log("cntActividad"+cntInactivida);
	setTimeout(function() {evaluacionSession()}, 5000);
} 
function respSetNaturaleza(resp){
	var atrrNaturalez  = resp.split(";");
	console.log("response servicio is "+resp); 
	
	if(resp!="0"){	 
	   atrrNaturalez1= atrrNaturalez[0];
	   if(atrrNaturalez1 =="1"){
	      preventiva= atrrNaturalez[1];
		  naturalezaRevision=atrrNaturalez[1];
	   }	  
       fkRevision= atrrNaturalez[2];
       console.log("fkRevision "+fkRevision); 	   
	}
	if(resp=="2"){
	  optSession.message = "Disculpe; su Session de Usuario se ha CERRADO por Inactividad..!";
	  optSession.subtitle = " SESSION CERRADA";
	  eModal.alert(optSession);           		
	  return;
	}
	setTimeout(function() {evaluacionContexto()}, 500);
}
function evaluacionContexto(){
	 var exitPlaca = document.getElementsByClassName("col-xs-12 col-md-3 col-sm-3 show-grande ng-binding");
     var even = exitPlaca[0].innerHTML;
	 callFuncion="firedClick"; 
    if(even.length>78){
	   if(atrrNaturalez1=="0"){  
	       if(naturalezaRevision =="N"){
			  options.message = "PRE-REVISION (RTM): PRIMERA VEZ"
           }else{
			    options.message = "PRE-REVISION (Preventiva): PRIMERA VEZ";
           }	     
	      ctxPreRevision="1";		  
	      options.subtitle = "  Contexto de PreRevision";
	      eModal.alert(options);
	    }
        if(atrrNaturalez1 =="1"){
           if(preventiva =="N"){
		      options.message = "REINSPECCION PARA  RTM";			 
		    }else{
		       options.message = "REINSPECCION  PARA PREVENTIVA";
	        }   
	        ctxPreRevision="2";       
	        options.subtitle = "  Contexto de PreRevision";
	        eModal.alert(options);
	    }
        if(atrrNaturalez1 =="3"){
           if(preventiva =="N"){
	          optAlternativas.message = "LO SENTIMOS SU RTM EXCEDIO el plazo de los 15 dias; DESEA  CONTINUAR ?";
	       }else{ 
             optAlternativas.message = "LO SENTIMOS SU PREVENTIVA EXCEDIO el plazo de los 15 dias; DESEA CONTINUAR ?";		  
	       }
	       ctxPreRevision="1";       
	       optAlternativas.subtitle = " Contexto de PreRevision";
	       eModal.alert(optAlternativas);           		   
	       return ;
	    }		
	}else{
		setTimeout(function() {evaluacionContexto()}, 1250); 
    }	 
}
	

function firedClick(){	
  var exitPlaca = document.getElementsByClassName("col-xs-12 col-md-3 col-sm-3 show-grande ng-binding");
  var even = exitPlaca[0].innerHTML;
  if(even.length>78){
     console.log("invocado en firedClick 1 "+even.length+" ::::::::::::::::::::::::;;;;;;;;;;:");	  
	 var docRuntDiv = document.getElementsByClassName("panel-heading");	
     $(docRuntDiv[6]).click(); 
     $(docRuntDiv[5]).click();
     $(docRuntDiv[8]).click();
	 $(docRuntDiv[10]).click();	     
     setTimeout(function() {evaluacionSoat()}, 850);	
  }else{
	 setTimeout(function() {firedClick()}, 2880); 
  }
}

function ctxSalirPreRev(){
    var entidad = "servicioRechazo";	
	var cadenaAtributos, streaming = "";   
	cadenaAtributos =  document.getElementById("noPlaca").value  + ";"+"RECHAZADA REINSPECCION X SUPERAR LOS 15 DIAS"+";9; ";	
	streaming = entidad + "|" + cadenaAtributos;	
	doAjax('https://192.168.1.10:8181/SART-WEB/ServicioBasicoControler.do', streaming, 'respRechazoSoat','get', 0);
}
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  if ("withCredentials" in xhr) { 
      xhr.open(method, url, true);
	  console.log("  lo va a enviar ");  // undefined
	  xhr.send();
   } else {
     console.log("Otherwise, CORS is not supported by the browser ");  // undefined
    
    xhr = null;

  }
}
function ctxOutSession(){
	createTabNaturaleza();
}
function ctxFuntion(){
	console.log("estoy en ctxFuction ");
	if(callFuncion=="validarRevision"){
		console.log("fired validarRevision");
		naturalezaRevision= document.getElementById('natRev').value;
		preventiva= document.getElementById('natRev').value;
		console.log("naturalezaRevision "+naturalezaRevision);
        setTimeout(function() {validarRevisionVehiculo()}, 50);
		return ;
    }
	if(callFuncion=="validacionTecnomecanica"){
		console.log("fired firedTecnomecanica");
        setTimeout(function() {firedTecnomecanica()}, 500);
		return ;
    }
	
	
	if(callFuncion=="evaluacionSoat"){
		console.log("fired evaluacionSoat");
        setTimeout(function() {evaluacionSoat()}, 150);
		return ;
    }
	if(callFuncion=="firedClick"){
		console.log("fired firedClick");
        setTimeout(function() {firedClick()}, 500);
		return ;
    }
	
	if(callFuncion=="creacionTab"){		
        setTimeout(function() {createTab()}, 500);
		return;
    }  
    if(callFuncion=="intetntoRecogerSoat"){
       setTimeout(function() {firedClick()}, 500);
	   return;
    }
	
	if(callFuncion=="registroRtmSolicitada"){		
       setTimeout(function() {registroRechazoSolicitudPendiente()}, 500);
	   return ;
    }	
	
    if(naturalezaRevision=="N"){
		console.log("fired 2");
        if(callFuncion=="registroRechazo"){
			console.log("fired 3");
          setTimeout(function() {registroRechazoSoat()}, 500);
        }
        if(callFuncion=="registroDatosRunt"){
            console.log("firedregistro runt x RTM");			
          setTimeout(function() {registroDatosRunt()}, 500);
        } 		
    }else{
		console.log("fired registro runt x preventiva");
        setTimeout(function() {registroDatosRunt()}, 500);  
    }
    
    callFuncion="";
}
 function validarRevisionVehiculo(){	 
    console.log(" fue "+	preventiva);
	var txtPlaca = document.getElementById("noPlaca").value;
	console.log("bendigan a Jehova oh alma mia "+document.getElementById("noPlaca").value);
	var entidad = "getNaturalezaPreRevision";
    var cadenaAtributos, streaming = ""; 
    streaming = entidad + "|" + txtPlaca;			
    doAjax('https://192.168.1.10:8181/SART-WEB/ServicioBasicoControler.do', streaming, 'respSetNaturaleza','get', 0);	 
 }

 function firedTecnomecanica(){
	var docRuntDiv = document.getElementsByClassName("panel-heading");		
	console.log("se supone que dispare los click de certificado tecno ")
     setTimeout(function() {validacionTecnomecanica()}, 700);	 
 }
 function validacionTecnomecanica(){
	 var docRuntTbl = document.getElementsByTagName("table");	 
     var body =docRuntTbl[2].tBodies[0]; 
	 console.log(" valor "+body) 
	 if(body.rows[0]!=null){	 
		 
	 	 if(body.rows[0].cells[3].innerHTML!=null && body.rows[0].cells[2].innerHTML!=null ){
			ultimaRev=body.rows[0].cells[3].innerHTML;
	        options.message=" LA ULTIMA  RTM  FUE CERTIFICADA EN <b>"+body.rows[0].cells[3].innerHTML+ "</b>  <br/>  VENCE: <b> "+body.rows[0].cells[2].innerHTML+" </b><br/>  ";
	        options.subtitle="INF.CERTIFICADO RTM";
	        eModal.alert(options);
	        docRuntTbl = document.getElementsByTagName("table");
	        var bodyS =docRuntTbl[4].tBodies[0];
	        if(bodyS.rows[0]!=null){
              if(bodyS.rows[0].cells[2].innerHTML=="REGISTRADA" && ctxPreRevision==1){
	             callFuncion="registroRtmSolicitada";
				 var fecha1 =bodyS.rows[0].cells[1].innerHTML.split("</span>");
				 optDanger.message="ACTUALMENTE POSEE UNA SOLICITUD ABIERTA EN <b>"+bodyS.rows[0].cells[4].innerHTML+"</b> DESDE EL <b>"+fecha1[1]+"</b>";
				 optDanger.subtitle="<b>RECHAZO SOLICITUD RTM </b>";
				 Recepcion.Linea= bodyS.rows[0].cells[4].innerHTML;
				 Recepcion.Modelo= fecha1[1];
				 eModal.alert(optDanger);	
	           }else{
		         callFuncion="registroDatosRunt";
               }
	        }else{
			  callFuncion="registroDatosRunt";
			}
     }
   }
 }

function evaluacionSoat(){
     var docRuntTbl = document.getElementsByTagName("table"); $('table')
     var body =docRuntTbl[0].tBodies[0];
	 console.log("estoy en evaluacion soat ");  // undefined	
     clearTimeout(evaluacionSoat);
     if(body.rows.length>0){
		
	var fecha1 = body.rows[0].cells[1].innerHTML.split("</span>");
	var fecha2 = body.rows[0].cells[2].innerHTML.split("</span>");
	var fecha3 = body.rows[0].cells[3].innerHTML.split("</span>");
	RecepcionSoat.Placa=""; 
	RecepcionSoat.NroPoliza= $('#pnlPolizaSoatNacional > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(1)').text().trim();
	RecepcionSoat.FechaExpedicion= $('#pnlPolizaSoatNacional > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(2)').text().trim();
	RecepcionSoat.FechaInicVigencia= $('#pnlPolizaSoatNacional > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(3)').text().trim();
	RecepcionSoat.FechaFinVigencia= $('#pnlPolizaSoatNacional > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(4)').text().trim();				
	RecepcionSoat.EntidadSoap= $('#pnlPolizaSoatNacional > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(5)').text().trim();
    var estado = body.rows[0].cells[5].innerHTML.split("</span>");
	RecepcionSoat.Estado= $('#pnlPolizaSoatNacional > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(6)').text().trim();
	options.message= " <BR> EL ESTADO ACTUAL DEL SOAT ES <b>VIGENTE </b> HASTA EL <b>"+RecepcionSoat.FechaFinVigencia+" </b>";
	options.subtitle = " INFORMACION DE VALIDACION";
	 console.log("estoy en evaluacion soat "+RecepcionSoat.Estado);  // undefined	
	if(RecepcionSoat.Estado=="VIGENTE"){
       var dtsTecnico=document.getElementById("pnlDatosTecnicos");
       var datosTec =dtsTecnico.getElementsByClassName("col-xs-12 col-md-3 col-sm-3 show-grande ng-binding");
       RecepcionSoat.CapacidadCarga=$('#pnlDatosTecnicos > div > div > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(2)').text().trim();
            RecepcionSoat.PesoBruto=$('#pnlDatosTecnicos > div > div > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(4)').text().trim();
            console.log("PESO BRUTO  "+datosTec[1].innerHTML.trim());  // undefined	
            console.log("PESO BRUTO A NIVEL OBJETO  "+RecepcionSoat.PesoBruto);  // undefined			
            RecepcionSoat.CapacidadPasajeros=$('#pnlDatosTecnicos > div > div > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)').text().trim();
            RecepcionSoat.NroEjes=$('#pnlDatosTecnicos > div > div > div > div:nth-child(2) > div:nth-child(3) > div.col-xs-12.col-md-3.col-sm-3.show-grande.ng-binding').text().trim();		   
            var docRunt = document.getElementsByClassName("col-xs-12 col-md-3 col-sm-3 show-grande ng-binding");		   
	        var docIdentificacion = $('body > div:nth-child(2) > div > div.col-lg-12.ng-scope > div.col-lg-10 > div:nth-child(1) > div.content_runt > div.panel.panel-primary.main > div:nth-child(3) > div.col-sm-9.panel-der > div > div > form > div:nth-child(5) > div.input-group > input').val().trim();
            Recepcion.Identificacion= $('body > div:nth-child(2) > div > div.col-lg-12.ng-scope > div.col-lg-10 > div:nth-child(1) > div.content_runt > div.panel.panel-primary.main > div:nth-child(3) > div.col-sm-9.panel-der > div > div > form > div:nth-child(5) > div.input-group > input').val().trim();
            Recepcion.TipoIdentificacion= $('body > div:nth-child(2) > div > div.col-lg-12.ng-scope > div.col-lg-10 > div:nth-child(1) > div.content_runt > div.panel.panel-primary.main > div:nth-child(3) > div.col-sm-9.panel-der > div > div > form > div:nth-child(4) > div > select').val().trim(); 
            Recepcion.Placa= $('body > div:nth-child(2) > div > div.col-lg-12.ng-scope > div.col-lg-10 > div:nth-child(1) > div.content_runt > div.panel.panel-primary.main > div:nth-child(5) > div.panel-body.panel-collapse > div > div:nth-child(1) > div.col-xs-12.col-md-3.col-sm-3.show-grande.ng-binding').text().trim();		 
            Recepcion.Licencia=$('body > div:nth-child(2) > div > div.col-lg-12.ng-scope > div.col-lg-10 > div:nth-child(1) > div.content_runt > div.panel.panel-primary.main > div:nth-child(5) > div.panel-body.panel-collapse > div > div:nth-child(2) > div:nth-child(2)').text().trim();
            Recepcion.EdoVehiculo= $('body > div:nth-child(2) > div > div.col-lg-12.ng-scope > div.col-lg-10 > div:nth-child(1) > div.content_runt > div.panel.panel-primary.main > div:nth-child(5) > div.panel-body.panel-collapse > div > div:nth-child(2) > div:nth-child(4)').text().trim();
            Recepcion.TipoServicio=$('body > div:nth-child(2) > div > div.col-lg-12.ng-scope > div.col-lg-10 > div:nth-child(1) > div.content_runt > div.panel.panel-primary.main > div:nth-child(5) > div.panel-body.panel-collapse > div > div:nth-child(3) > div.col-xs-12.col-md-3.col-sm-3.show-grande.ng-scope.ng-binding').text().trim();
            Recepcion.ClaseVehiculo= $('body > div:nth-child(2) > div > div.col-lg-12.ng-scope > div.col-lg-10 > div:nth-child(1) > div.content_runt > div.panel.panel-primary.main > div:nth-child(5) > div.panel-body.panel-collapse > div > div:nth-child(3) > div:nth-child(4)').text().trim();		
            Recepcion.Marca=$('#pnlInformacionGeneralVehiculo > div > div > div > div:nth-child(1) > div:nth-child(2)').text().trim();			
            Recepcion.Linea= $('#pnlInformacionGeneralVehiculo > div > div > div > div:nth-child(1) > div:nth-child(4)').text().trim();
	        Recepcion.Modelo= $('#pnlInformacionGeneralVehiculo > div > div > div > div:nth-child(2) > div:nth-child(2)').text().trim();
	        Recepcion.Color= $('#pnlInformacionGeneralVehiculo > div > div > div > div:nth-child(2) > div:nth-child(4)').text().trim();			
            Recepcion.NroSerie=$('#pnlInformacionGeneralVehiculo > div > div > div > div:nth-child(3) > div:nth-child(2)').text().trim();
	        Recepcion.NroMotor= $('#pnlInformacionGeneralVehiculo > div > div > div > div:nth-child(3) > div:nth-child(4)').text().trim();
            Recepcion.NroChasis= $('#pnlInformacionGeneralVehiculo > div > div > div > div:nth-child(4) > div:nth-child(2)').text().trim();
            Recepcion.NroVin= $('#pnlInformacionGeneralVehiculo > div > div > div > div:nth-child(4) > div:nth-child(4)').text().trim();
	        Recepcion.Cilindraje= $('#pnlInformacionGeneralVehiculo > div > div > div > div:nth-child(5) > div:nth-child(2)').text().trim();
	        Recepcion.tipoCarroceria= $('#pnlInformacionGeneralVehiculo > div > div > div > div:nth-child(5) > div:nth-child(4)').text().trim();
            Recepcion.tipoCombustible= $('#pnlInformacionGeneralVehiculo > div > div > div > div:nth-child(6) > div:nth-child(2)').text().trim();
			if(naturalezaRevision=="N"){
			   callFuncion="validacionTecnomecanica";	
		    }else{
			    callFuncion="registroDatosRunt";	
			}		
	        var fec= docRunt[17].innerHTML.split("</span>");			
            Recepcion.fecha= $('#pnlInformacionGeneralVehiculo > div > div > div > div:nth-child(6) > div:nth-child(4)').text().trim();
	        Recepcion.EsEnsenanza= $('#pnlInformacionGeneralVehiculo > div > div > div > div:nth-child(13) > div:nth-child(2)').text().trim();
	        Recepcion.NroPuertas= $('#pnlInformacionGeneralVehiculo > div > div > div > div:nth-child(13) > div:nth-child(4)').text().trim();		 
			eModal.alert(options);	
      }else{
	        var docRunt = document.getElementsByClassName("col-xs-12 col-md-3 col-sm-3 show-grande ng-binding");
	        RecepcionSoat.Placa = $('body > div:nth-child(2) > div > div.col-lg-12.ng-scope > div.col-lg-10 > div:nth-child(1) > div.content_runt > div.panel.panel-primary.main > div:nth-child(5) > div.panel-body.panel-collapse > div > div:nth-child(1) > div.col-xs-12.col-md-3.col-sm-3.show-grande.ng-binding').text().trim();
	        optDanger.message="LAMENTABLEMENTE, EL SOAT <b>NO ESTA VIGENTE</b>, EXPIRO  "+RecepcionSoat.FechaFinVigencia+ " ";
            callFuncion="registroRechazo";
	        eModal.alert(optDanger);						
       }
    }else{
	   options.message = "DISCULPE, NO PUDE RECOGER LA VALIDACION DEL SOAT";
	   callFuncion="intetntoRecogerSoat";
	   options.subtitle = "  Intente de Nuevo";
	   eModal.alert(options);
    }
}

async function registerScript(message) {
  
}

function registroDatosRunt(){
   var frm;
   var envio =true;
   clearTimeout(registroDatosRunt);	
   if(envio==true){
	  console.log("voy a enviar los datos runt");
      var entidad = "transmisionDatosRunt";
      var cadenaAtributos, streaming = "";		   
      cadenaAtributos = fkRevision+" ;"+ ctxPreRevision+" ;"+Recepcion.Identificacion +";"+ Recepcion.TipoIdentificacion + ";"+   Recepcion.Placa + ";"+Recepcion.EdoVehiculo+ "; "+Recepcion.Licencia+ "; "+Recepcion.TipoServicio+ "; "+Recepcion.ClaseVehiculo+ "; "+Recepcion.Marca+ "; "+Recepcion.Linea + "; "+Recepcion.Modelo + "; "+ Recepcion.Color + "; "+Recepcion.NroSerie + "; "+Recepcion.NroMotor + "; "+Recepcion.NroChasis + "; "+Recepcion.NroVin + "; "+Recepcion.Cilindraje + "; "+Recepcion.tipoCarroceria + "; "+ Recepcion.tipoCombustible+ "; "+Recepcion.fecha + "; "+Recepcion.EsEnsenanza + "; "+Recepcion.NroPuertas +"; "+RecepcionSoat.NroPoliza+"; "+RecepcionSoat.FechaExpedicion+"; "+RecepcionSoat.FechaInicVigencia+"; "+RecepcionSoat.FechaFinVigencia+"; "+RecepcionSoat.EntidadSoap+"; "+RecepcionSoat.CapacidadCarga+"; "+ RecepcionSoat.PesoBruto+"; "+ RecepcionSoat.CapacidadPasajeros+"; "+
      RecepcionSoat.NroEjes+"; "+ " ;"+ " ;"+ctxPreRevision+ ";"+naturalezaRevision+ ";"+ultimaRev;
	  console.log("bendigan a Jehova "+cadenaAtributos); 
      streaming = entidad + "|" + cadenaAtributos;
      doAjax('https://192.168.1.10:8181/SART-WEB/ServicioBasicoControler.do', streaming, 'respRegAutomaticoRunt','get', 0);	 
    }
}
function respRegAutomaticoRunt(resp){	
	("bendigan a Jehova resp AutomaticoRunt "+resp);
   if(parseInt(resp) > 0){
     options.message= " Se REGISTRO los datos de manera EXITOSA..!";
     options.subtitle = " Registro Datos";
   }else{
     options.message= " He presentado PROBLEMAS al momento de Registrar los datos";
     options.subtitle = " Registro Datos";		
   }
   
   callFuncion="creacionTab";
   eModal.alert(options); 
}

function createTab() { 
  try {
	  
	  if( Recepcion.ClaseVehiculo=="Motocicleta" || Recepcion.ClaseVehiculo=="MOTOCICLETA"){ 
	      console.log(" ESTOY SEND MESSAGE WITH MOTOCICLETA  ");
	     chrome.runtime.sendMessage({closeThis:1});
	  }else{
		 chrome.runtime.sendMessage({closeThis:2}); 
	  } 
  } catch (e) {
    alert(e);
  }
}
function createTabNaturaleza() { 
  try {
	  chrome.runtime.sendMessage({closeThis:3});    
  } catch (e) {
    alert(e);
  }
}


function registroRechazoSoat(){	
	var entidad = "servicioRechazo";	
	var cadenaAtributos, streaming = "";			
	cadenaAtributos =  RecepcionSoat.Placa  + ";"+"SOAT VENCIDO DESDE: " + RecepcionSoat.FechaFinVigencia+";0; ";	
	streaming = entidad + "|" + cadenaAtributos;			
	doAjax('https://192.168.1.10:8181/SART-WEB/ServicioBasicoControler.do', streaming, 'respRechazoSoat','get', 0);	
}
function registroRechazoSolicitudPendiente(){
	var entidad = "servicioRechazo";
	console.log("bendigan a Jehova resp Registro Rechazo solicitud Pendiente ");
	var cadenaAtributos, streaming = "";   
	cadenaAtributos =  Recepcion.Placa  + ";"+"SOLICITUD EFECTUADA EN "+ Recepcion.Linea +"DIA "+  Recepcion.Modelo+";7; ";	
	streaming = entidad + "|" + cadenaAtributos;	
	doAjax('https://192.168.1.10:8181/SART-WEB/ServicioBasicoControler.do', streaming, 'respRechazoSoat','get', 0);	
}

function respRechazoSoat(resp){
   console.log("RESPIS "+resp); 
 options.message= " RegistroRechazo "+resp;
     options.subtitle = " Registro Datos";	
 eModal.alert(options);  	 
	if(parseInt(resp)==0){
		optDanger.message = "Disculpe, no Pude REGISTRAR la causal de Rechazo, Comuniquese con el equipo de Soporte Tecnico de SOLTELEC";
		optDanger.subtitle = "Fallo del Sart";
		eModal.alert(optDanger);
	}else{
		createTabNaturaleza();
	}	
} 

//--user-data-dir="C://Reichelinasben session" --disable-web-security --unsafely-treat-insecure-origin-as-secure=http://192.168.0.77:8080


