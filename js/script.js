$('.copy-btn').click(function ()
{
   copy();
   $(this).text("copied");


});


function htmlEncode(value)
{
   return $('<div/>').text(value).html();
}

$(function ()
{
   $("#generate").click(function ()
   {
      $(".qr-code").attr("src", "https://chart.googleapis.com/chart?cht=qr&chl=" + htmlEncode($("#content").val()) + "&chs=160x160&chld=L|0");

   });
});


function openQRCamera(node)
{
   var reader = new FileReader();
   reader.onload = function ()
   {
      node.value = "";
      qrcode.callback = function (res)
      {
         if (res instanceof Error)
         {
            $(".alert-success").addClass('d-none');
            $(".alert-danger").removeClass('d-none');
            $('.textarea a').addClass('disabled');
            $('.textarea textarea').attr('disabled', 'true');
            $('.textarea textarea').val(' ')
         }
         else
         {
            $(".alert-danger").addClass('d-none');
            $(".alert-success").removeClass('d-none');
            document.getElementById('dis').value = res;
            $('.textarea a').removeClass('disabled');
            $('.textarea textarea').removeAttr('disabled');
            if (isUrl(res))
            {
               $('.content-type').text('URL value found.');
               var html = '<strong class="content-type">URL value found.</strong><span class="text-muted ml-3">Open link </span><a href=" ' + res + '" class="btn-type ml-2" target="_blank">new tab</a>  <a href=" ' + res + '" class="btn-type ml-2" target="_self">Same tab</a>                        '
               $('.alert-success').html(html);

            }
            else
            {
               $('.alert-success').html('<strong class="content-type">Text value found.</strong>');

            }


         }
      };
      qrcode.decode(reader.result);
   };
   reader.readAsDataURL(node.files[0]);
}


function isUrl(s)
{
   var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
   return regexp.test(s);
}

function copy()
{
   var textarea = document.getElementById("dis");
   textarea.select();
   document.execCommand("copy");
}