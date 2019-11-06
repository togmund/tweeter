// Wait until the document is ready to run scripts
$(document).ready(() => {

  $( "article.tweet" ).hover(
    function() { $( this ).addClass( "hover" ); },
    function() { $( this ).removeClass( "hover" ); }
  );

});