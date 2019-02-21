﻿/*
 alert("欢迎使用鲁班插件");
 */
function S4() {
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
function guid() {
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

var Process = (function () {
  function preHandleCommonAPI(typeId) {
    var actionDescriptor = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var actionReference = new ActionReference();
    var idDcmn = charIDToTypeID("Dcmn");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    actionReference.putEnumerated(idDcmn, idOrdn, idTrgt);
    actionDescriptor.putReference(idnull, actionReference);
    executeAction(stringIDToTypeID(typeId), actionDescriptor, DialogModes.NO);
  }
  var _preHandleMask = function () {
    var typeId = 'e805a6ee-6d75-4b62-b6fe-f5873b5fdf20';
    preHandleCommonAPI(typeId);
  };

  var _preHandleStyle = function () {
    var typeId = '8a761c74-f362-4a1b-a3f7-e779ab319a08';
    preHandleCommonAPI(typeId);
  };

  var _preHandleEmptyLayer = function () {
    var typeId = 'a0754df2-9c60-4b64-a940-6a2bb1102652';
    preHandleCommonAPI(typeId);
  };

  var _rasterizeLayer = function () {
    var idrasterizeAll = stringIDToTypeID("rasterizeAll");
    executeAction(idrasterizeAll, undefined, DialogModes.NO);
  };

  var _preHandleRemoveHiddenLayers = function () {
    var idDlt = charIDToTypeID("Dlt ");
    var actionDescriptor = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var actionReference = new ActionReference();
    actionReference.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), stringIDToTypeID("hidden"));
    actionDescriptor.putReference(idnull, actionReference);
    executeAction(idDlt, actionDescriptor, DialogModes.NO);
  };

  var _preHandleColorMode = function () {
    var doc = app.activeDocument;
    if (doc.mode != 'DocumentMode.CMYK') {
      return;
    }

    var idCnvM = charIDToTypeID("CnvM");
    var desc69 = new ActionDescriptor();
    var idT = charIDToTypeID("T   ");
    var idRGBM = charIDToTypeID("RGBM");
    desc69.putClass(idT, idRGBM);
    var idMrge = charIDToTypeID("Mrge");
    desc69.putBoolean(idMrge, false);
    var idRstr = charIDToTypeID("Rstr");
    desc69.putBoolean(idRstr, false);
    executeAction(idCnvM, desc69, DialogModes.NO);
  };
  var preHandle = function () {
    try {
      _preHandleRemoveHiddenLayers();
    } catch (e) {
      //Util.log('method:__preHandleRemoveHiddenLayers, error info: ' + e.toString());
    }
    try {
      _preHandleMask();
    } catch (e) {
      //Util.log('method: _preHandleMask, error info: ' + e.toString());
      return false;
    }
    try {
      _preHandleStyle();
    } catch (e) {
      //Util.log('method: _preHandleStyle, error info: ' + e.toString());
      return false;
    }
    try {
      _preHandleEmptyLayer();
    } catch (e) {
      //Util.log('method: _preHandleEmptyLayer, error info: ' + e.toString());
      return false;
    }
    try {
      _preHandleColorMode();
    } catch (e) {
      //Util.log('method: _preHandleColorMode, error info: ' + e.toString());
      return false;
    }
    return true;
  };

  var open = function (file) {
    var openResult = true;
    try {
      app.displayDialogs = DialogModes.NO;
      app.open(file);
    } catch (e) {
      //Util.log('method: open, error info: ' + e.toString());
      openResult = false;
    }
    return openResult;
  };

  var save = function (file) {
    var saveResult = true;
    try {
      var filePath = file.path;
      var fileName = file.displayName;
      var index = fileName.lastIndexOf('.psd') != -1 ? fileName.lastIndexOf('.psd') : fileName.lastIndexOf('.PSD');
      if (index === -1) {
        //Util.log('file:' + file.fullName + ', is not psd file');
        return false;
      }
      var parsedFileName = filePath + '/' + fileName.substring(0, index) + '_parsedV1.psd';
      app.activeDocument.saveAs(File(parsedFileName), new PhotoshopSaveOptions(), true, Extension.LOWERCASE);
      var newFiles = File(parsedFileName);
      return newFiles.fsName +"_luban-hongxuan_"+newFiles.name;
    } catch (e) {
      saveResult = false;
    }
    if (!saveResult) {
      try {
        _rasterizeLayer();
      } catch (e) {


      }
      try {
        app.activeDocument.saveAs(File(parsedFileName), new PhotoshopSaveOptions(), true, Extension.LOWERCASE);
        var newFiles = File(parsedFileName);
        return newFiles.fsName +"_luban-hongxuan_"+newFiles.name;
      } catch (e) {
        return false;
      }
    }
  };

  var handle = function (file) {
    preHandle();
    return save(file);
  };
  return {
    handle: handle
  }
}());
function getLayers(layers, fileName)
{
  for (var i =0; i<layers.length; i++)
  {
    if(layers[i].typename == "LayerSet")//判断是否是图层组
    {
      var layer = layers[i];
      if(layer.name == fileName){
        return layer
      }else{
        getLayers(layers[i].layers, fileName);//递归
      }
    }

  }
}

function movelayer(itemIndex,itemIndexArr){
  var idmove = charIDToTypeID( "move" );
  var desc11 = new ActionDescriptor();
  var idnull = charIDToTypeID( "null" );
  var ref8 = new ActionReference();
  var idLyr = charIDToTypeID( "Lyr " );
  var idOrdn = charIDToTypeID( "Ordn" );
  var idTrgt = charIDToTypeID( "Trgt" );
  ref8.putEnumerated( idLyr, idOrdn, idTrgt );
  desc11.putReference( idnull, ref8 );
  var idT = charIDToTypeID( "T   " );
  var ref9 = new ActionReference();
  var idLyr = charIDToTypeID( "Lyr " );
  ref9.putIndex( idLyr, itemIndex-1);
  desc11.putReference( idT, ref9 );
  var idAdjs = charIDToTypeID( "Adjs" );
  desc11.putBoolean( idAdjs, false );
  var idVrsn = charIDToTypeID( "Vrsn" );
  desc11.putInteger( idVrsn, 5 );
  var idLyrI = charIDToTypeID( "LyrI" );
  var list7 = new ActionList();
  for(var i = 0; i<itemIndexArr.length;i++){
    list7.putInteger( itemIndexArr[i] );
  }
  desc11.putList( idLyrI, list7 );
  executeAction( idmove, desc11, DialogModes.NO );
}

var csActionPlugin = function(){
  return this;
}
csActionPlugin.prototype = {
  alert:function(msg){
    alert(msg)
  },
  addMenu:function(menuName){
    menuName = menuName.split(",");
    for(var i = 0 ; i<menuName.length ; i++){
      var l =app.activeDocument.layerSets.add();
      l.name  = menuName[i];
    }
  },
  reNameLayer:function(fileName){
    var itemIndexArr =  ki.layer.getTargetLayersID();
    if( itemIndexArr.length == 1 && ki.layer.isLayerSet(Kinase.REF_LayerID,itemIndexArr[0])){
      ki.layer.setLayerName_byActive(fileName)
    }else{
      var l = "";
      ki.layer.getAllLayersItemIndex();
      l =  getLayers(app.activeDocument.layers, fileName);
      if(l){
        movelayer(l.itemIndex,itemIndexArr)

      }else{
        l =app.activeDocument.layerSets.add();
        l.name = fileName;
        ki.layer.selectMultLayers_byID(itemIndexArr,true);
        movelayer(l.itemIndex,itemIndexArr)
      }
    }


  },
  openBrowser:function(url){
    var id = guid();
    var fname = "css3ps-" + id + ".url";
    var shortcut = new File(Folder.temp + '/' + fname);
    shortcut.open('w');
    shortcut.writeln('[InternetShortcut]');
    shortcut.writeln('URL=' + url);
    shortcut.writeln();
    shortcut.close();
    shortcut.execute();
  },

  SavePNG24:function(saveFile)
  {
    var idExpr = charIDToTypeID( "Expr" );
    var desc14 = new ActionDescriptor();
    var idUsng = charIDToTypeID( "Usng" );
    var desc15 = new ActionDescriptor();
    var idOp = charIDToTypeID( "Op  " );
    var idSWOp = charIDToTypeID( "SWOp" );
    var idOpSa = charIDToTypeID( "OpSa" );
    desc15.putEnumerated( idOp, idSWOp, idOpSa );
    var idDIDr = charIDToTypeID( "DIDr" );
    desc15.putBoolean( idDIDr, true );
    var idIn = charIDToTypeID( "In  " );
    desc15.putPath( idIn, new File( saveFile ) );
    var idFmt = charIDToTypeID( "Fmt " );
    var idIRFm = charIDToTypeID( "IRFm" );
    var idPNtwofour = charIDToTypeID( "PN24" );
    desc15.putEnumerated( idFmt, idIRFm, idPNtwofour );
    var idIntr = charIDToTypeID( "Intr" );
    desc15.putBoolean( idIntr, false );
    var idTrns = charIDToTypeID( "Trns" );
    desc15.putBoolean( idTrns, true );
    var idMtt = charIDToTypeID( "Mtt " );
    desc15.putBoolean( idMtt, true );
    var idEICC = charIDToTypeID( "EICC" );
    desc15.putBoolean( idEICC, false );
    var idMttR = charIDToTypeID( "MttR" );
    desc15.putInteger( idMttR, 255 );
    var idMttG = charIDToTypeID( "MttG" );
    desc15.putInteger( idMttG, 255 );
    var idMttB = charIDToTypeID( "MttB" );
    desc15.putInteger( idMttB, 255 );
    var idSHTM = charIDToTypeID( "SHTM" );
    desc15.putBoolean( idSHTM, false );
    var idSImg = charIDToTypeID( "SImg" );
    desc15.putBoolean( idSImg, true );
    var idSWsl = charIDToTypeID( "SWsl" );
    var idSTsl = charIDToTypeID( "STsl" );
    var idSLAl = charIDToTypeID( "SLAl" );
    desc15.putEnumerated( idSWsl, idSTsl, idSLAl );
    var idSWch = charIDToTypeID( "SWch" );
    var idSTch = charIDToTypeID( "STch" );
    var idCHsR = charIDToTypeID( "CHsR" );
    desc15.putEnumerated( idSWch, idSTch, idCHsR );
    var idSWmd = charIDToTypeID( "SWmd" );
    var idSTmd = charIDToTypeID( "STmd" );
    var idMDCC = charIDToTypeID( "MDCC" );
    desc15.putEnumerated( idSWmd, idSTmd, idMDCC );
    var idohXH = charIDToTypeID( "ohXH" );
    desc15.putBoolean( idohXH, false );
    var idohIC = charIDToTypeID( "ohIC" );
    desc15.putBoolean( idohIC, true );
    var idohAA = charIDToTypeID( "ohAA" );
    desc15.putBoolean( idohAA, true );
    var idohQA = charIDToTypeID( "ohQA" );
    desc15.putBoolean( idohQA, true );
    var idohCA = charIDToTypeID( "ohCA" );
    desc15.putBoolean( idohCA, false );
    var idohIZ = charIDToTypeID( "ohIZ" );
    desc15.putBoolean( idohIZ, true );
    var idohTC = charIDToTypeID( "ohTC" );
    var idSToc = charIDToTypeID( "SToc" );
    var idOCzerothree = charIDToTypeID( "OC03" );
    desc15.putEnumerated( idohTC, idSToc, idOCzerothree );
    var idohAC = charIDToTypeID( "ohAC" );
    var idSToc = charIDToTypeID( "SToc" );
    var idOCzerothree = charIDToTypeID( "OC03" );
    desc15.putEnumerated( idohAC, idSToc, idOCzerothree );
    var idohIn = charIDToTypeID( "ohIn" );
    desc15.putInteger( idohIn, -1 );
    var idohLE = charIDToTypeID( "ohLE" );
    var idSTle = charIDToTypeID( "STle" );
    var idLEzerothree = charIDToTypeID( "LE03" );
    desc15.putEnumerated( idohLE, idSTle, idLEzerothree );
    var idohEn = charIDToTypeID( "ohEn" );
    var idSTen = charIDToTypeID( "STen" );
    var idENzerozero = charIDToTypeID( "EN00" );
    desc15.putEnumerated( idohEn, idSTen, idENzerozero );
    var idolCS = charIDToTypeID( "olCS" );
    desc15.putBoolean( idolCS, false );
    var idolEC = charIDToTypeID( "olEC" );
    var idSTst = charIDToTypeID( "STst" );
    var idSTzerozero = charIDToTypeID( "ST00" );
    desc15.putEnumerated( idolEC, idSTst, idSTzerozero );
    var idolWH = charIDToTypeID( "olWH" );
    var idSTwh = charIDToTypeID( "STwh" );
    var idWHzeroone = charIDToTypeID( "WH01" );
    desc15.putEnumerated( idolWH, idSTwh, idWHzeroone );
    var idolSV = charIDToTypeID( "olSV" );
    var idSTsp = charIDToTypeID( "STsp" );
    var idSPzerofour = charIDToTypeID( "SP04" );
    desc15.putEnumerated( idolSV, idSTsp, idSPzerofour );
    var idolSH = charIDToTypeID( "olSH" );
    var idSTsp = charIDToTypeID( "STsp" );
    var idSPzerofour = charIDToTypeID( "SP04" );
    desc15.putEnumerated( idolSH, idSTsp, idSPzerofour );
    var idolNC = charIDToTypeID( "olNC" );
    var list1 = new ActionList();
    var desc16 = new ActionDescriptor();
    var idncTp = charIDToTypeID( "ncTp" );
    var idSTnc = charIDToTypeID( "STnc" );
    var idNCzerozero = charIDToTypeID( "NC00" );
    desc16.putEnumerated( idncTp, idSTnc, idNCzerozero );
    var idSCnc = charIDToTypeID( "SCnc" );
    list1.putObject( idSCnc, desc16 );
    var desc17 = new ActionDescriptor();
    var idncTp = charIDToTypeID( "ncTp" );
    var idSTnc = charIDToTypeID( "STnc" );
    var idNConenine = charIDToTypeID( "NC19" );
    desc17.putEnumerated( idncTp, idSTnc, idNConenine );
    var idSCnc = charIDToTypeID( "SCnc" );
    list1.putObject( idSCnc, desc17 );
    var desc18 = new ActionDescriptor();
    var idncTp = charIDToTypeID( "ncTp" );
    var idSTnc = charIDToTypeID( "STnc" );
    var idNCtwoeight = charIDToTypeID( "NC28" );
    desc18.putEnumerated( idncTp, idSTnc, idNCtwoeight );
    var idSCnc = charIDToTypeID( "SCnc" );
    list1.putObject( idSCnc, desc18 );
    var desc19 = new ActionDescriptor();
    var idncTp = charIDToTypeID( "ncTp" );
    var idSTnc = charIDToTypeID( "STnc" );
    var idNCtwofour = charIDToTypeID( "NC24" );
    desc19.putEnumerated( idncTp, idSTnc, idNCtwofour );
    var idSCnc = charIDToTypeID( "SCnc" );
    list1.putObject( idSCnc, desc19 );
    var desc20 = new ActionDescriptor();
    var idncTp = charIDToTypeID( "ncTp" );
    var idSTnc = charIDToTypeID( "STnc" );
    var idNCtwofour = charIDToTypeID( "NC24" );
    desc20.putEnumerated( idncTp, idSTnc, idNCtwofour );
    var idSCnc = charIDToTypeID( "SCnc" );
    list1.putObject( idSCnc, desc20 );
    var desc21 = new ActionDescriptor();
    var idncTp = charIDToTypeID( "ncTp" );
    var idSTnc = charIDToTypeID( "STnc" );
    var idNCtwofour = charIDToTypeID( "NC24" );
    desc21.putEnumerated( idncTp, idSTnc, idNCtwofour );
    var idSCnc = charIDToTypeID( "SCnc" );
    list1.putObject( idSCnc, desc21 );
    desc15.putList( idolNC, list1 );
    var idobIA = charIDToTypeID( "obIA" );
    desc15.putBoolean( idobIA, false );
    var idobIP = charIDToTypeID( "obIP" );
    desc15.putString( idobIP, "''''");
    var idobCS = charIDToTypeID( "obCS" );
    var idSTcs = charIDToTypeID( "STcs" );
    var idCSzeroone = charIDToTypeID( "CS01" );
    desc15.putEnumerated( idobCS, idSTcs, idCSzeroone );
    var idovNC = charIDToTypeID( "ovNC" );
    var list2 = new ActionList();
    var desc22 = new ActionDescriptor();
    var idncTp = charIDToTypeID( "ncTp" );
    var idSTnc = charIDToTypeID( "STnc" );
    var idNCzeroone = charIDToTypeID( "NC01" );
    desc22.putEnumerated( idncTp, idSTnc, idNCzeroone );
    var idSCnc = charIDToTypeID( "SCnc" );
    list2.putObject( idSCnc, desc22 );
    var desc23 = new ActionDescriptor();
    var idncTp = charIDToTypeID( "ncTp" );
    var idSTnc = charIDToTypeID( "STnc" );
    var idNCtwozero = charIDToTypeID( "NC20" );
    desc23.putEnumerated( idncTp, idSTnc, idNCtwozero );
    var idSCnc = charIDToTypeID( "SCnc" );
    list2.putObject( idSCnc, desc23 );
    var desc24 = new ActionDescriptor();
    var idncTp = charIDToTypeID( "ncTp" );
    var idSTnc = charIDToTypeID( "STnc" );
    var idNCzerotwo = charIDToTypeID( "NC02" );
    desc24.putEnumerated( idncTp, idSTnc, idNCzerotwo );
    var idSCnc = charIDToTypeID( "SCnc" );
    list2.putObject( idSCnc, desc24 );
    var desc25 = new ActionDescriptor();
    var idncTp = charIDToTypeID( "ncTp" );
    var idSTnc = charIDToTypeID( "STnc" );
    var idNConenine = charIDToTypeID( "NC19" );
    desc25.putEnumerated( idncTp, idSTnc, idNConenine );
    var idSCnc = charIDToTypeID( "SCnc" );
    list2.putObject( idSCnc, desc25 );
    var desc26 = new ActionDescriptor();
    var idncTp = charIDToTypeID( "ncTp" );
    var idSTnc = charIDToTypeID( "STnc" );
    var idNCzerosix = charIDToTypeID( "NC06" );
    desc26.putEnumerated( idncTp, idSTnc, idNCzerosix );
    var idSCnc = charIDToTypeID( "SCnc" );
    list2.putObject( idSCnc, desc26 );
    var desc27 = new ActionDescriptor();
    var idncTp = charIDToTypeID( "ncTp" );
    var idSTnc = charIDToTypeID( "STnc" );
    var idNCtwofour = charIDToTypeID( "NC24" );
    desc27.putEnumerated( idncTp, idSTnc, idNCtwofour );
    var idSCnc = charIDToTypeID( "SCnc" );
    list2.putObject( idSCnc, desc27 );
    var desc28 = new ActionDescriptor();
    var idncTp = charIDToTypeID( "ncTp" );
    var idSTnc = charIDToTypeID( "STnc" );
    var idNCtwofour = charIDToTypeID( "NC24" );
    desc28.putEnumerated( idncTp, idSTnc, idNCtwofour );
    var idSCnc = charIDToTypeID( "SCnc" );
    list2.putObject( idSCnc, desc28 );
    var desc29 = new ActionDescriptor();
    var idncTp = charIDToTypeID( "ncTp" );
    var idSTnc = charIDToTypeID( "STnc" );
    var idNCtwofour = charIDToTypeID( "NC24" );
    desc29.putEnumerated( idncTp, idSTnc, idNCtwofour );
    var idSCnc = charIDToTypeID( "SCnc" );
    list2.putObject( idSCnc, desc29 );
    var desc30 = new ActionDescriptor();
    var idncTp = charIDToTypeID( "ncTp" );
    var idSTnc = charIDToTypeID( "STnc" );
    var idNCtwotwo = charIDToTypeID( "NC22" );
    desc30.putEnumerated( idncTp, idSTnc, idNCtwotwo );
    var idSCnc = charIDToTypeID( "SCnc" );
    list2.putObject( idSCnc, desc30 );
    desc15.putList( idovNC, list2 );
    var idovCM = charIDToTypeID( "ovCM" );
    desc15.putBoolean( idovCM, false );
    var idovCW = charIDToTypeID( "ovCW" );
    desc15.putBoolean( idovCW, false );
    var idovCU = charIDToTypeID( "ovCU" );
    desc15.putBoolean( idovCU, true );
    var idovSF = charIDToTypeID( "ovSF" );
    desc15.putBoolean( idovSF, true );
    var idovCB = charIDToTypeID( "ovCB" );
    desc15.putBoolean( idovCB, true );
    var idovSN = charIDToTypeID( "ovSN" );
    desc15.putString( idovSN, """images""" );
    var idSaveForWeb = stringIDToTypeID( "SaveForWeb" );
    desc14.putObject( idUsng, idSaveForWeb, desc15 );
    executeAction( idExpr, desc14, DialogModes.NO );


  },

  checkActivDoc:function(){
    var f = new File(app.activeDocument.fullName);
    return Process.handle(File(f.fsName));
  }
}

