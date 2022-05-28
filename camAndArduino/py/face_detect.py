from math import sqrt

import cv2
import mediapipe as mp
import serial


def getDis(x1, y1, x2, y2):
    return sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)


def controlArduino():
    pass


def main():
    mp_drawing = mp.solutions.drawing_utils
    mp_drawing_styles = mp.solutions.drawing_styles
    mp_pose = mp.solutions.pose
    # For webcam input:
    cap = cv2.VideoCapture(0)
    x0, y0 = 1, 1
    com = "COM7"
    ser = serial.Serial(com, 9600)
    with mp_pose.Pose(
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5) as pose:
        while cap.isOpened():
            success, image = cap.read()
            # Flip the image horizontally for a selfie-view display.
            image = cv2.flip(image, 1)
            h, w, c = image.shape
            r = min(h, w)
            xm, ym = w / 2, h / 2
            com = 'no'
            if not success:
                print("Ignoring empty camera frame.")
                # If loading a video, use 'break' instead of 'continue'.
                continue

            # To improve performance, optionally mark the image as not writeable to
            # pass by reference.
            image.flags.writeable = False
            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            results = pose.process(image)

            # Draw the pose annotation on the image.
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

            if results.pose_landmarks:
                for id, lm in enumerate(results.pose_landmarks.landmark):
                    if id == 0:
                        x0, y0 = int(lm.x * w), int(lm.y * h)
                        # x0, y0 = lm.x, lm.y
                        if getDis(x0, y0, xm, ym) >= r:
                            if x0 > xm:
                                com = "left#"
                            elif x0 < xm:
                                com = "right#"
                            else:
                                com = "stop#"
                            ser.write(com.encode('utf-8'))

                            if y0 > ym:
                                com = "up#"
                            elif y0 < ym:
                                com = "down#"
                            else:
                                com = "stop#"
                            ser.write(com.encode('utf-8'))
                        print(x0, y0)
            cv2.circle(image, (x0, y0), 50, (100, 200, 200), -1)
            cv2.imshow('MediaPipe Pose', image)

            if cv2.waitKey(5) & 0xFF == 27:
                break
    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    main()
