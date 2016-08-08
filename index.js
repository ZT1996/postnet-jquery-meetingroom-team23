function showMessage(message) {
    $("#console").text(message);
}

let flag = 0;
function send() {
    let input = $("#input").val();

    if (flag == 0) {
        if (input == 1) {
            let message = 'Please input zip code:';
            flag = 1;
            showMessage(message);
        }
        else if (input == 2) {
            let message = 'Please input bar code:';
            flag = 2;
            showMessage(message);
        }
        else if (input == 3) {
            process.exit();
        }
        else {
            let message = 'Please give right input';
            showMessage(message);
        }
    }
    if (flag == 1) {
        zipcodeToBarcode(input);
    }
    if (flag == 2) {
        barcodeToZipcode(input);
    }
}

function start() {
    let menu = `1. Translate zip code to bar code
2. Translate bar code to zip code
3. Quit
Please input your choices(1~3)`;
    showMessage(menu);
}

function zipcodeToBarcode(input) {
    $.get('./zipcode-to-barcode/' + input, function (barcode) {
        showMessage(barcode);
    });
}

function barcodeToZipcode(input) {
    $.get('./barcode-to-zipcode/' + input, function (zipcode) {
        showMessage(zipcode);
    })
}

start();