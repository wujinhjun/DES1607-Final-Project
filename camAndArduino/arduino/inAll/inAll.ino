#include <Adafruit_MS_PWMServoDriver.h>
#include <Stepper.h>

#define STEPS 64

Adafruit_MS_PWMServoDriver pwm = Adafruit_MS_PWMServoDriver(0x60);
Stepper stepper(STEPS, 8, 10, 9, 11);

int serve_0 = 0;
int serve_angle_0 = 90;
int steps = 0;
String items;

void servo_set_pulse(int servo_id, double pulse) {
    double pulseLength;

    if (servo_id < 0 || servo_id > 5) {
        return;
    }

    pulseLength = 1000000; // 1,000,000 us per second
    pulseLength /= 50;     // 50 Hz
    pulseLength /= 4096;   // 12 bits of resolution
    pulse *= 1000;
    pulse /= pulseLength;

    pwm.setPWM(servo_id, 0, int(pulse));
}

void servo_set_angle(int servo_id, uint8_t angle) {
    double pulse;

    if (angle < 0 || angle > 180) {
        return;
    }
    pulse = 0.5 + angle / 90.0;
    servo_set_pulse(servo_id, pulse);
}

void setup()
{
    Serial.begin(9600);
    // WIRE.begin();
    pwm.begin();
    pwm.setPWMFreq(50);

    for(int i = 0; i < 16; i ++) {
        pwm.setPWM(i, 0, 0);
    }
    stepper.setSpeed(200);
    servo_set_angle(serve_0, serve_angle_0);
}

void loop()
{
    if (Serial.available() > 0) {
        items = Serial.readStringUntil('#');
        if (String(items).equals(String("left"))) {
            if (serve_angle_0 < 180) {
                serve_angle_0 += 2;
            }

            // Serial.println("nice");
        } else if (String(items).equals(String("right"))) {
            if (serve_angle_0 > 0) {
                serve_angle_0 -= 2;
            }
            // serve_angle_0 -= 3;
        } else if (String(items).equals(String("upSteps"))) {
            steps = 50;
        } else if (String(items).equals(String("downSteps"))) {
            steps = -50;
        } else {
            steps = 0;
        }
        servo_set_angle(serve_0, serve_angle_0);
        stepper.step(steps);
        Serial.println(items);
    }
    items = " ";
}