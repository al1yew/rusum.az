
$(document).ready(function () {

    $(document).on('submit', '#mainForm', function (e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        let autoType = formData.get('autoType');
        let engineType = formData.get('engineType');
        let price = formData.get('price');
        let volume = formData.get('volume');
        let source = formData.get('source');
        let date = formData.get('date');

        console.log(autoType);
        console.log(engineType);
        console.log(price);
        console.log(volume);
        console.log(source);
        console.log(date);

        // formData.forEach(element => {
        //     console.log(element)
        // });

        //dalshe budem proverat uje
    });

    $(document).on('click', '.inplabelkeeper', function () {

        $(this).siblings('label').removeClass('isselected')
        $(this).addClass('isselected');
    });

    $(document).on('click', '.descP', function () {
        $(this).next().toggleClass('opened');

        $('.descP').html() == 'Bağla' ? $('.descP').html('Ölkələr haqqda') : $('.descP').html('Bağla')
    })
});