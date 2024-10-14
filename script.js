let menu = document.querySelector('#menu-btn');
let sidebar = document.querySelector('.sidebar');
let register = document.querySelector('#register-btn');
let close = document.querySelector('.sidebar i');
let form = document.querySelector(".booking-form");
let formClose = document.querySelector('#form-close');
let book = document.querySelector('#booking-btn');

// Initialize roomRate as 0
let roomRate = 0;

book.addEventListener('click', function () {
    form.style.display = 'block'
})
formClose.addEventListener('click', function () {
    form.style.display = 'none';
})

const roomValue = {
    'Delux': 2500,
    'Suite': 4000
};

const comfortValue = {
    'AC': 1000,
    'Locker': 300
};

menu.addEventListener('click', function () {
    sidebar.style.right = '0';
    menu.style.color = 'transparent';
});

close.addEventListener('click', function () {
    sidebar.style.right = '-20%';
    menu.style.color = '#fff';
});

function calculateTotalAmount() {
    var amenities = form.querySelectorAll('input[name="amenities"]:checked');
    var comfortRate = 0;
    amenities.forEach(function (amenityInput) {
        comfortRate += comfortValue[amenityInput.value];
    });

    var numberOfdays = parseInt(form.elements.days.value);
    var totalAmount = (roomRate * numberOfdays) + (comfortRate * numberOfdays);

    // Calculate extra charges for more than 2 persons
    var numberOfpersons = parseInt(form.elements.adults.value); // Get the number of persons
    if (numberOfpersons > 2) {
        totalAmount += (numberOfdays - 2) * 1000;
    }

    var advanceAmount = parseInt(form.elements.advanceAmount.value);

    // Subtract advance amount
    totalAmount = totalAmount - advanceAmount;

    return totalAmount;
}

register.addEventListener("click", function () {
    if (formValid()) {
        analyseData();
        document.getElementById("popup").style.display = "block";
        var totalAmount = calculateTotalAmount();
        document.getElementById("TA").textContent = "Amount to be paid " + totalAmount;
    } else {
        alert("Fill in all the fields");
    }
});

document.getElementById("popup-close").addEventListener("click", function () {
    document.getElementById("popup").style.display = "none";
    form.reset();
});

function formValid() {
    var customerName = form.elements.yourName.value;
    var checkInDate = form.elements.checkIn.value;
    var numberOfdays = form.elements.days.value;
    var advanceAmount = form.elements.advanceAmount.value;

    if (customerName === '' || checkInDate === '' || numberOfdays === '' || advanceAmount === '') {
        return false;
    }
    return true;
}

function analyseData() {
    var roomType = form.querySelector('input[name="roomType"]:checked');

    if (roomType) {
        roomRate = roomValue[roomType.value];
    }
}
