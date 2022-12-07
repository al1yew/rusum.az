toastr.options = {
    hideDuration: 300,
    timeOut: 2500,
    positionClass: "toast-bottom-right",
    "closeButton": false,
    "debug": false,
    "newestOnTop": true,
    "progressBar": false,
    "preventDuplicates": false,
    "onclick": null,
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

$(document).ready(function () {

    $('#datepicker').datepicker({
        format: "dd/mm/yyyy",
        autoclose: true,
        container: ".date"
    });

    if ($(document).width() < 576) {
        $('.resultkeeper').hide()
        $('.advert').attr('href', 'https://www.instagram.com/garantauto.az/')
    }

    $(document).on('submit', '#mainForm', function (e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        let autoType = formData.get('autoType');
        let engineType = formData.get('engineType');
        let price = formData.get('price');
        let volume = formData.get('volume');
        let source = formData.get('source');
        let selectedDate = formData.get('date');

        let arrayOfDate = selectedDate.split('/')

        const trimmedarray = arrayOfDate.map(ar => {
            return ar.trim()
        })

        selectedDate = trimmedarray[2] + "-" + trimmedarray[1] + "-" + trimmedarray[0]

        const today = new Date;
        let date = new Date(selectedDate);
        let currency = 1.7;

        if (engineType == 0 || price <= 0 || (volume <= 0 && engineType != "elektrik") || selectedDate.length == 0 || today.getTime() < date.getTime()) {

            if (engineType == 0) {
                toastr.error('Mühərrikin növü seçilməlidir!')
            }

            if (price <= 0) {
                toastr.error('Gömrük dəyəri doldurulmalıdır!')
            }

            if (volume <= 0 && engineType != "elektrik") {
                toastr.error('Mühərrikin həcmi doldurulmalıdır!')
            }

            if (selectedDate.length == 0) {
                toastr.error('Istehsal tarixi seçilməlidir!')
            }

            if (today.getTime() < date.getTime()) {
                toastr.error('Istehsal tarixi səhvdir!')
            }

            if ($(document).width() < 576) {
                $('.resultkeeper').hide()
                $(document).scrollTop(0)
            }

            return;
        }

        price = parseInt(price);
        volume = parseInt(volume);

        let idxal,
            aksiz,
            edv,
            gomrukyigimi,
            vesigehaqqi = 30,
            elektrongomruk = 30,
            elektrongomrukedv = elektrongomruk * 0.18,
            gomrukekspertizasi = 30,
            ekspertizarusumu = 30;

        if (autoType == "auto") {

            //#region idxal rusumu

            if (source == "contract") {

                idxal = 0;
            }
            else if (source == "another") {

                switch (engineType) {
                    case "elektrik":

                        idxal = price * currency * 0.15;
                        break;

                    case "benzin":
                    case "dizel":
                    case "qaz":
                    case "hibrid-benzin":
                    case "hibrid-dizel":

                        if (volume <= 1500) {

                            if ((today - date) / 1000 / 60 / 60 / 24 / 365 < 1) {
                                idxal = volume * currency * 0.4;
                            }
                            else {
                                idxal = volume * 0.7 * currency;
                            }
                        }
                        else {

                            if ((today - date) / 1000 / 60 / 60 / 24 / 365 < 1) {
                                idxal = volume * currency * 0.7;
                            }
                            else {
                                idxal = volume * 1.2 * currency
                            }
                        }

                        break;
                }
            }

            //#endregion idxal rusumu

            //#region aksiz

            var koeffForThreeYears = 0;
            var koeffForSevenYears = 1;

            //190.4.1-3
            if ((today - date) / 1000 / 60 / 60 / 24 / 365 > 3) {
                koeffForThreeYears = 1;
            }

            //190.4.1-4.
            if ((today - date) / 1000 / 60 / 60 / 24 / 365 > 7 &&
                (engineType == "benzin" || engineType == "qaz" || engineType == "hibrid-benzin")) {
                koeffForSevenYears = 1.2;
            }
            else if ((today - date) / 1000 / 60 / 60 / 24 / 365 > 7 &&
                (engineType == "dizel" || engineType == "hibrid-dizel")) {
                koeffForSevenYears = 1.5;
            }

            if (volume <= 2000) {

                aksiz = volume * 0.3 * koeffForSevenYears;
            }
            else if (volume > 2000 && volume <= 3000) {

                aksiz = (600 + ((volume - 2000) * 5)) * koeffForSevenYears;
            }
            else if (volume > 3000 && volume <= 4000) {

                var addition = 2;
                aksiz = (5600 + ((volume - 3000) * (13 + addition * koeffForThreeYears))) * koeffForSevenYears;
            }
            else if (volume > 4000 && volume <= 5000) {

                var addition = 5;
                aksiz = (18600 + ((volume - 4000) * (35 + addition * koeffForThreeYears))) * koeffForSevenYears;
            }
            else if (volume > 5000) {

                var addition = 10;
                aksiz = (53600 + ((volume - 5000) * (70 + addition * koeffForThreeYears))) * koeffForSevenYears;
            }

            //#endregion aksiz

            //#region gomruk yigimi

            if (price * currency > 0 && price * currency <= 1000) {
                gomrukyigimi = 15
            } else if (price * currency > 1000 && price * currency <= 10000) {
                gomrukyigimi = 60
            } else if (price * currency > 10000 && price * currency <= 50000) {
                gomrukyigimi = 120
            } else if (price * currency > 50000 && price * currency <= 100000) {
                gomrukyigimi = 200
            } else if (price * currency > 100000 && price * currency <= 500000) {
                gomrukyigimi = 300
            } else if (price * currency > 500000 && price * currency <= 1000000) {
                gomrukyigimi = 600
            } else gomrukyigimi = 1000

            //#endregion gomruk yigimi

            //#region edv

            if (((engineType == "hibrid-benzin" || engineType == "hibrid-dizel") &&
                (today - date) / 1000 / 60 / 60 / 24 / 365 < 3 &&
                volume <= 2500) ||
                engineType == "electric") {

                edv = gomrukyigimi * 0.18;
            }
            else {
                edv = (idxal + aksiz + (price * currency) + gomrukyigimi + vesigehaqqi) * 0.18
            }

            //#endregion edv

            //#region gomruk ekspertizasi ve rusumu

            if ((today - date) / 1000 / 60 / 60 / 24 / 365 < 1) {
                ekspertizarusumu = 0;
            }

            //#endregion gomruk ekspertizasi ve rusumu

            $('.idxalresult').html(`${idxal.toFixed(2)} AZN`)
            $('.edvresult').html(`${edv.toFixed(2)} AZN`)
            $('.gomrukyigimlariresult').html(`${gomrukyigimi.toFixed(2)} AZN`)
            $('.aksizresult').html(`${aksiz.toFixed(2)} AZN`)
            $('.vesiqehaqqiresult').html(`${vesigehaqqi.toFixed(2)} AZN`)
            $('.elektrongomrukresult').html(`${elektrongomruk.toFixed(2)} AZN`)
            $('.elektrongomrukedvresult').html(`${elektrongomrukedv.toFixed(2)} AZN`)
            $('.gomrukekspertizasi').html(`${gomrukekspertizasi.toFixed(2)} AZN`)
            $('.ekspertizarusumu').html(`${ekspertizarusumu.toFixed(2)} AZN`)

            $('.overallAZN').html(`${(idxal + edv + gomrukyigimi + aksiz + vesigehaqqi + elektrongomruk + elektrongomrukedv).toFixed(2)} AZN`)

            if ($(window).width() < 576) {

                $('.resultkeeper').fadeIn()
                $(document).scrollTop(800)
            }


        }
        else if (autoType == "bus") {

        }
    });

    $(document).on('click', '.inplabelkeeper', function () {

        $(this).siblings('label').removeClass('isselected')
        $(this).addClass('isselected');
    });

    $(document).on('click', '.descP', function () {
        $(this).next().toggleClass('opened');

        $('.descP').html() == 'Bağla' ? $('.descP').html('Ölkələr haqqda') : $('.descP').html('Bağla')
    })

    $(document).on('change', '#engineType', function () {
        if ($(this).val() == "elektrik") {
            $('#volume').attr("readonly", "true")
            $('#volume').val(0)
            $('#volume').addClass('inputReadonly')
        }
        else {
            $('#volume').removeAttr('readonly')
            $('#volume').removeClass('inputReadonly')
        }
    })

    $(document).on('click', '.infoicon', function () {
        if ($(window).width() < 576) {
            $(this).find('span').toggleClass('showinfoprice')
        }
    })


});
