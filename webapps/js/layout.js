$(document).ready(function () {
    // $("#sideNavBar").show()
    renderUserDetails();
    loadUserProfilePicture();

    document.querySelector('#main').addEventListener('click',closeNav() );
   
});

// $('body').click(function() {
//     if($("#sideNavBar").hasClass('barwidth')){
//         $("#sideNavBar").removeClass('barwidth');
//         $(".barmenu").html('<i class="fa fa-bars"></i>');
//       }
// });

function renderUserDetails() {
    $(".user_profile_name").html(USER_OBJ.firstName +' '+(USER_OBJ.lastName ? USER_OBJ.lastName : ''))
}


function removeCookies() {
    Cookies.remove('session_obj');
    Cookies.remove('domain_logo');
    Cookies.remove('user_picture');
}

function logout() {
    loginOutCall(function (status,data) {
        removeCookies();
        document.location='/login';

    });


}


function loadUserProfilePicture() {

    if (!Cookies.get('user_picture')) {

        getUserProperty(PROFILE_PICTURE_PROPERTY, function (status, data) {
            if (status) {
                var src = JSON.parse(data.value);
                Cookies.set('user_picture', src.picture);
                $(".user_profile_picture").attr('src', API_BASE_PATH + '/files/download/' + API_TOKEN + '/' + src.picture);
            } else {
                $(".user_profile_picture").attr('src', "/images/user.png");
            }

        })
    } else {
        $(".user_profile_picture").attr('src', API_BASE_PATH + '/files/download/' + API_TOKEN + '/' + Cookies.get('user_picture'));
    }
}


function openNav() {
    // $("#sideNavBar").toggle(300);

    $("#sideNavBar").animate({
        width: 'toggle'
      });

      if($("#sideNavBar").hasClass('barwidth')){
        $("#sideNavBar").removeClass('barwidth');
        $(".barmenu").html('<i class="fa fa-bars"></i>');
      }else{
        $("#sideNavBar").addClass('barwidth');
        $(".barmenu").html('<i class="fa fa-times"></i>');
      }
   
   
}
function closeNav() {

    // console.log('closing...')
    if($("#sideNavBar").hasClass('barwidth')){
        $("#sideNavBar").removeClass('barwidth');
        $(".barmenu").html('<i class="fa fa-bars"></i>');
        $("#sideNavBar").animate({
            width: 0
          });
      }
}