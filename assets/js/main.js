  var typed = new Typed('#typed', {
     stringsElement: '#typed-strings',
     typeSpeed: 100,
     startDelay: 0,
     backSpeed: 20,
     loop: true
  });

  function feedbackShow() {
     console.log('i am inside feedback function')

     $.get('/feedback',
        () => {
           $('#feedback').append(
              $('<li>').text('Thank You For Your FeedBack')
           )
        }
     )
  }

  $('#feedback-submit').click(() => {
     console.log('button clicked')
     $.post('/feedback', {
           name: $('#feedback-name').val(),
           email: $('#feedback-email').val(),
           country: $('#feedback-country').val(),
           message: $('#feedback-message').val()
        },
        () => {
           console.log('show feedback called')
           feedbackShow()
        }
     )

  })



  //   $(() => {})

  $(() => {
     $('#feedback').hide()

  })