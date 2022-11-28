
$(document).ready(function () {

    $(document).on('submit', '#mainForm', function (e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        let autoType = formData.get('autoType');
        let engineType = formData.get('engineType');
        let volume = formData.get('volume');
        let price = formData.get('price');

        console.log(autoType);
        console.log(engineType);
        console.log(volume);
        console.log(price);

        // formData.forEach(element => {
        //     console.log(element)
        // });

        //dalshe budem proverat uje
    });

    $(document).on('click', '.inplabelkeeper', function () {

        $(this).siblings('label').removeClass('isselected')
        $(this).addClass('isselected');
    });
});