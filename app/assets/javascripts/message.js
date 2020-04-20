$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="message-list">
          <div class="user-date">
            <div class="user-date__name">
              ${message.user_name}
            </div>
            <div class="user-date__timestamp">
              ${message.created_at}
            </div>
          </div>
          <div class="message-list__message">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} class="lower-message__image" >
        </div>`
      return html;
    } else {
      var html =
       `<div class="message-list">
          <div class="user-date">
            <div class="user-date__name">
              ${message.user_name}
            </div>
            <div class="user-date__timestamp">
              ${message.created_at}
            </div>
          </div>
          <div class="message-list__message">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url:  url,
      type: 'POST',
      data: formData,
      datatype: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html =buildHTML(data);
      $('.main-chat__message-list').append(html);
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.message-form__btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  })
});