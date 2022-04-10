let hello = JSON.parse(sessionStorage.getItem('info'));
$('#main_d').append(hello.main_d);
$('#about_me').append(hello.about_me);
$('#container_1').append(hello.container_1);
$('#container_2').append(hello.container_2);
$('#container_3').append(hello.container_3);
$('#container_4').append(hello.container_4);


