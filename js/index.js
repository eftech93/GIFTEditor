function checkGift(str){

}

function removeErrorMessageFromElement(element){
    var html = $(element).html();
    html.replace("<u class=\"spelling\">", "");
    html.replace("</u>", "");
    $(element).html(html);
}

function removerErrorMessage(hmtl){
    html.replaceAll("<u class=\"spelling\">", "");
    html.replaceAll("</u>", "");
    return html;
}
 
function verifyGift(str){
    try {
      var giftObj = giftParser.parse(str);
      return {result : "Everything looks good!"};
    }
    catch(err) {
      if(err.location){
        // Set up the error message with proper context
        var badGIFT="";
        var index = err.location.start.offset;
        var paddingBefore= "";
        var paddingAfter= "";
        var underlinedText = " "+str.substring(err.location.start.offset,err.location.end.offset+1)+" ";
  
        if(err.location.start.offset-20>0){
          paddingBefore = str.substring(err.location.start.offset-20,err.location.start.offset-1);
        } else if(err.location.start.offset !=0){
          paddingBefore = str.substring(0,err.location.start.offset-1);
        }
  
        if(err.location.end.offset+20<str.length){
          paddingAfter= str.substring(err.location.end.offset+2,err.location.end.offset+20);
        } else if(err.location.end.offset !=str.length){
          paddingAfter= str.substring(err.location.end.offset+2, str.length);
        }
  
        badGIFT=paddingBefore+underlinedText+paddingAfter;
        return {error:"Line "+parseInt(err.location.start.line)+"<br> column "+parseInt(err.location.start.column)+"<br> near: "+badGIFT+"<br> "+err.message};
        //return new Error("Line "+parseInt(err.location.start.line)+", column "+parseInt(err.location.start.column)+" near:<b> "+badGIFT+"</b><br> "+err.message);
      } else {
        return {error: err};
      }
    }
  }
  
  function onKeyPressed(element, result){
      try{
        removeErrorMessageFromElement(element);
        var str = $(element).html();
        str = removeHTMLElements(str);
        var r = verifyGift(str);
        if(r['result']){
            $(result).text(r['result']);
        }else{
            $(result).html(r['error']);
        }
      }catch(err){
        $(result).html(err);
      }
  }

  function removeHTMLElements(str){
    str = str.replace(/\<br>/g, '\n');
    str = str.replace(/\<div>/g, '');
    str = str.replace(/\<\/div>/g, '');
    return str;
  }
  
