
function removeErrorMessageFromElement(element){
    var html = $(element).html();
    html.replace("<u class=\'spelling\'>", "");
    html.replace("</u>", "");
    $(element).html(html);
}

function removerErrorMessage(hmtl){
    html.replaceAll("<u class=\'spelling\'>", "");
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
        return {error: {"line" : parseInt(err.location.start.line),
                "column" : parseInt(err.location.start.column),
                "near":badGIFT,
                "message": err.message}};
        //return new Error("Line "+parseInt(err.location.start.line)+", column "+parseInt(err.location.start.column)+" near:<b> "+badGIFT+"</b><br> "+err.message);
      } else {
        return {error: err};
      }
    }
  }
  
  function onKeyPressed(element, result){
      try{
        var str = $(element).html();
        str = removeHTMLElements(str);
        var r = verifyGift(str);
        if(r['result']){
            $(result).html(r['result']);
        }else{
            if(r['error']['line']){
              var line = r['error']['line'];
              var column = r['error']['column'];
              var near = r['error']['near'];
              var message = r['error']['message'];
              var strArray = str.split('\n');
              strArray[line - 1] = '<u class=\'spelling\'>' + strArray[line - 1] + '</u>';
              str = strArray.join('<br>');
              //str = str.slice(0, r['error']['near']) +  '<u class="spelling">' + str.slice( r['error']['near'],  r['error']['near'] + 10) + '</u>' + str.slice( r['error']['near'] + 10);
              //str = str.replace(/\\n/g, '<br>');
              $(element).html(str);
              var errorMessage  ="Error at line : " + line + " and column : " + column + "<br>Near : " + near + "<br> Error Message : " + message;
              $(result).html(errorMessage);
            }else{
              $(result).html(r['error']);
            }
            
        }

      }catch(err){
        $(result).html(err);
      }
  }

  function onPaste(e, element,result){
    e.preventDefault();
    var pastedText;
    if(window.clipboardData && window.clipboardData.getData ) {
      pastedText = window.clipboardData.getData('Text');
    }  else if( e.clipboardData && e.clipboardData.getData ){
      pastedText = e.clipboardData.getData('text/plain');
    }
    pastedText = removeHTMLElements(pastedText);
    pastedText = pastedText.replace(/\\\n/g, '<br>');
    pastedText = pastedText.replace(/\%0A/g, "<br>");
    $(element).html(pastedText);
    onKeyPressed(element, result);
  }

  function onCopy(e, element){
    e.preventDefault();
    var str = $(element).html();
    e.clipboardData.setData('text/html', str);
    alert(str);
    str = removeHTMLElements(str);
    e.clipboardData.setData('text/plain', str);
    alert(str);
  }

  function removeHTMLElements(str){
    str = str.replace(/\<br>/g, '\n');
    str = str.replace(/\<div>/g, '');
    str = str.replace(/\<\/div>/g, '');
    str = str.replace(/\<u class="spelling">/g, '');
    str = str.replace(/\<\/u>/g, '');
    return str;
  }
  
