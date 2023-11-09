# Video Gallery App

Welcome to the Video Gallery App, a versatile application that combines video and image capturing capabilities while making effective use of the IndexedDB database for storing and retrieving media files. With features like video and image capturing, zoom control, applying filters, downloading media, and deleting stored media, this app elevates your multimedia experience.

## Project Link

You can access the Video Gallery App online at [Video Gallery](https://videoapp5945.netlify.app/).

## Code Summary

This application is built using JavaScript and leverages the Document Object Model (DOM) to handle user interactions and perform various operations. It utilizes the MediaDevices API to capture video and image data and employs HTML and CSS for displaying the resulting media. The app interacts with the IndexedDB database to retrieve and showcase stored media files, offering options for downloading or removing them.

### Detailed Breakdown of script.js

1. **Variable Initialization:** The script begins by initializing variables that reference important DOM elements, including the video display, record and capture buttons, filters, zoom controls, and the gallery button.

2. **Event Listeners:** Event listeners are set up for the gallery button to redirect to a gallery page and for the zoom buttons to adjust the video zoom level within defined bounds.

3. **Media Stream Capture:** An asynchronous function gets access to the video stream from the user's camera using `navigator.mediaDevices.getUserMedia()`. Once available, it sets the stream as the source for the video display.

4. **MediaRecorder Setup:** A `MediaRecorder` instance is created with the media stream, used for recording video. Event listeners are added for various recording events.

5. **Record and Capture Button Event Listeners:** The record button toggles the recording state, and the capture button triggers image capture and processing.

6. **Filter Handling:** Each filter element is given a click event listener that creates a filter div and applies the selected filter.

7. **Zoom Control:** Click events for zoom in and zoom out buttons adjust the current zoom level.

8. **Photo Capturing:** The `capturePhotoFun()` function captures an image from the video feed, applies the filter, and saves the image data to the IndexedDB database.

9. **Media Recording:** The `recordMediaFun()` function starts or stops video recording and toggles the recording state.

10. **Media Addition to DB:** The `addMedia()` function adds media files to the IndexedDB database.

### Detailed Breakdown of gallery.js

1. **Database Initialization:** The script initializes an IndexedDB database named "Gallery." It creates an object store "Media" with "mid" as the keyPath during the 'onupgradeneeded' event. In the 'onsuccess' event, it fetches all media from the database using the `fetchMedia()` function and displays them.

2. **Fetch Media Function:** This function opens a read-only transaction on the "Media" object store and iterates through stored media files. It appends each media item to the gallery based on its type (photo or video).

3. **Append Photo Function:** The `appendPhoto()` function creates a div containing an image, download, and delete buttons. Event listeners are attached to these buttons for actions.

4. **Append Video Function:** Similar to appendPhoto, the `appendVideo()` function creates a div for video files, complete with download and delete buttons.

5. **Download Media Function:** The `downloadMedia()` function triggers the download of a media file when clicked, with the appropriate download filename and href attribute.

6. **Delete Media Function:** The `deleteMedia()` function removes a media file from IndexedDB and the associated div from the page. It operates within a read-write transaction on the "Media" object store.
