from math import sqrt

import cv2
import mediapipe as mp
import serial


def getDis(x1, y1, x2, y2):
    return sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)


def control():
    pass


def main():
    mp_drawing = mp.solutions.drawing_utils
    mp_drawing_styles = mp.solutions.drawing_styles
    mp_pose = mp.solutions.pose

    cap = cv2.VideoCapture(0)
    # cap = cv2.VideoCapture("./test_1.mp4")
    x0, y0, x11, y11, x13, y13 = 0, 0, 0, 0, 0, 0
    dist_last, dist_temp = 0, 0
    com = "COM4"
    ser = serial.Serial(com, 9600)

    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        while cap.isOpened():
            success, image = cap.read()
            # image = cv2.flip(image, 1)
            h, w, c = image.shape
            # r = min(h, w)
            r = 200
            xm, ym = w / 2, h / 2
            comMsg = 'no'
            if not success:
                print("no cam")
                continue

            image.flags.writeable = False
            image = cv2.cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            results = pose.process(image);

            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

            if results.pose_landmarks:
                for id, lm in enumerate(results.pose_landmarks.landmark):
                    if id == 0:
                        x0, y0 = int(lm.x * w), int(lm.y * h)
                    elif id == 11:
                        x11, y11 = int(lm.x * w), int(lm.y * h)
                    elif id == 11:
                        x13, y13 = int(lm.x * w), int(lm.y * h)
                if getDis(x0, y0, xm, ym) >= r:
                    if x0 > xm:
                        comMsg = "left#"
                    elif x0 < xm:
                        comMsg = "right#"
                    else:
                        comMsg = "stop#"
                    ser.write(comMsg.encode('utf-8'))
                    # if y0 > xm:
                    #     comMsg = "up#"
                    # elif y0 < xm:
                    #     comMsg = "down#"
                    # else:
                    #     comMsg = "stop#"
                    # ser.write(comMsg.encode('utf-8'))
                    print(comMsg)

                dist_last = dist_temp
                dist_temp = getDis(x11, y11, x13, y13)
                dist_change = abs(dist_temp - dist_last)

                if dist_change > 2:
                    if y13 > y11:
                        if dist_temp > dist_last:
                            comMsg = "upSteps#"
                        else:
                            comMsg = "downSteps#"
                    else:
                        if dist_temp < dist_last:
                            comMsg = "upSteps#"
                        else:
                            comMsg = "downSteps#"
                    ser.write(comMsg.encode('utf-8'))
                    print(comMsg)
            mp_drawing.draw_landmarks(
                image,
                results.pose_landmarks,
                mp_pose.POSE_CONNECTIONS,
                landmark_drawing_spec=mp_drawing_styles.get_default_pose_landmarks_style())
            cv2.imshow('test', image)

            if cv2.waitKey(5) & 0xFF == 27:
                break
    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    main()
