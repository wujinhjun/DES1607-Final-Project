from math import sqrt

import cv2
import mediapipe as mp


def dist(x1, y1, x2, y2):
    return sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)


def main():
    mp_drawing = mp.solutions.drawing_utils
    mp_drawing_styles = mp.solutions.drawing_styles
    mp_pose = mp.solutions.pose
    # For webcam input:
    # cap = cv2.VideoCapture(0)
    cap = cv2.VideoCapture('./test.mp4')
    x11, y11 = x13, y13 = 0, 0
    dist_last, dist_temp = 0, 0
    com = " "
    with mp_pose.Pose(
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5) as pose:
        while cap.isOpened():
            success, image = cap.read()
            image = cv2.flip(image, 1)
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
            # print(results.pose_landmarks)
            # for poseLms in results.pose_landmarks:

            if results.pose_landmarks:
                for id, lm in enumerate(results.pose_landmarks.landmark):
                    h, w, c = image.shape
                    if id == 11:
                        x11, y11 = int(lm.x * w), int(lm.y * h)
                    elif id == 13:
                        x13, y13 = int(lm.x * w), int(lm.y * h)
                    dist_last = dist_temp
                    dist_temp = dist(x11, y11, x13, y13)
                    dist_change = abs(dist_temp - dist_last)
                    # print("dist_change: " + str(dist_change))
                    if dist_change > 10:
                        if y13 > y11:
                            if dist_temp > dist_last:
                                com = "downStep#"
                            else:
                                com = "upStep#"
                        else:
                            if dist_temp < dist_last:
                                com = "downStep#"
                            else:
                                com = "upStep#"
                        print(com)
            mp_drawing.draw_landmarks(
                image,
                results.pose_landmarks,
                mp_pose.POSE_CONNECTIONS,
                landmark_drawing_spec=mp_drawing_styles.get_default_pose_landmarks_style())
            # Flip the image horizontally for a selfie-view display.
            cv2.circle(image, (x13, y13), 25, (100, 200, 200), -1)
            cv2.imshow('MediaPipe Pose', image)

            if cv2.waitKey(5) & 0xFF == 27:
                break
    cap.release()
    cv2.destroyAllWindows()


if __name__ == '__main__':
    main()
