bluetooth.onBluetoothConnected(function () {
    setMovement(movement.STOP)
basic.showString("C")
})
bluetooth.onBluetoothDisconnected(function () {
    setMovement(movement.STOP)
basic.showString("D")
})
input.onButtonPressed(Button.A, function () {
    if (pin8 == 1) {
        pin8 = 0
        pins.digitalWritePin(DigitalPin.P8, pin8)
        basic.clearScreen()
    } else {
        pin8 = 1
        pins.digitalWritePin(DigitalPin.P8, pin8)
        basic.showString("A")
    }
})
input.onButtonPressed(Button.B, function () {
    if (pin12 == 1) {
        pin12 = 0
        pins.digitalWritePin(DigitalPin.P12, pin12)
        basic.clearScreen()
    } else {
        pin12 = 1
        pins.digitalWritePin(DigitalPin.P12, pin12)
        basic.showString("B")
    }
})
control.onEvent(EventBusSource.MES_DPAD_CONTROLLER_ID, EventBusValue.MICROBIT_EVT_ANY, function () {
    switch (control.eventValue()) {
        case EventBusValue.MES_DPAD_BUTTON_1_DOWN:
            button1 = 1;
            break;
        case EventBusValue.MES_DPAD_BUTTON_1_UP:
            button1 = 0;
            break;
        case EventBusValue.MES_DPAD_BUTTON_2_DOWN:
            button2 = 1;
            break;
        case EventBusValue.MES_DPAD_BUTTON_2_UP:
            button2 = 0;
            break;
        case EventBusValue.MES_DPAD_BUTTON_C_DOWN:
            buttonc = 1;
            break;
        case EventBusValue.MES_DPAD_BUTTON_C_UP:
            buttonc = 0;
            break;
        case EventBusValue.MES_DPAD_BUTTON_D_DOWN:
            buttond = 1;
            break;
        case EventBusValue.MES_DPAD_BUTTON_D_UP:
            buttond = 0;
            break;
    }
currentMovement = convertDpadToMovement()
    setMovement(currentMovement)
})
function convertDpadToMovement () {
    if (button2 == 0) {
        if (buttonc == 1 && buttond == 0) {
            return movement.LEFT_FWD
        } else if (buttonc == 0 && buttond == 1) {
            return movement.RIGHT_FWD
        } else if (button1 == 1) {
            return movement.FORWARD
        }
    } else if (button1 == 0) {
        if (buttonc == 1 && buttond == 0) {
            return movement.LEFT_BACK
        } else if (buttonc == 0 && buttond == 1) {
            return movement.RIGHT_BACK
        } else {
            return movement.BACKWARD
        }
    }
    return movement.STOP
}

let buttond = 0 // LH pad, left button
let buttonc = 0 // LH pad, right button
let button2 = 0 // RH pad, bottom button
let button1 = 0 // RH pad, top button
let pin8 = 0    // left motor forward
let pin12 = 0   // right motor forward
let pin16 = 0   // when ==1, invert motor control (eg. pin12=0 then means right motor backward)

enum movement {
    LEFT_FWD,
    RIGHT_FWD,
    FORWARD,
    LEFT_BACK,
    RIGHT_BACK,
    BACKWARD,
    STOP
}
function setMovement(m: movement) {
    switch (m) {
        case movement.LEFT_FWD:
            pin16 = 0;
            pin12 = 1;
            pin8 = 0;
            basic.showArrow(ArrowNames.NorthWest)
            break;
        case movement.RIGHT_FWD:
            pin16 = 0;
            pin12 = 0;
            pin8 = 1;
            basic.showArrow(ArrowNames.NorthEast)
            break;
        case movement.FORWARD:
            pin16 = 0;
            pin12 = 1;
            pin8 = 1;
            basic.showArrow(ArrowNames.North)
            break;
        case movement.LEFT_BACK:
            pin16 = 1;
            pin12 = 0;
            pin8 = 1;
            basic.showArrow(ArrowNames.SouthWest)
            break;
        case movement.RIGHT_BACK:
            pin16 = 1;
            pin12 = 1;
            pin8 = 0;
            basic.showArrow(ArrowNames.SouthEast)
            break;
        case movement.BACKWARD:
            pin16 = 1;
            pin12 = 0;
            pin8 = 0;
            basic.showArrow(ArrowNames.South)
            break;
        case movement.STOP:
            pin16 = 0;
            pin12 = 0;
            pin8 = 0;
            basic.clearScreen()
            break;
    }
    pins.digitalWritePin(DigitalPin.P8, pin8)
    pins.digitalWritePin(DigitalPin.P12, pin12)
    pins.digitalWritePin(DigitalPin.P16, pin16)
}
let currentMovement = movement.STOP
basic.showString("2")
setMovement(currentMovement)
