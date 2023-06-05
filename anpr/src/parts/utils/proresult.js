
export function non_max_suppression(boxes , scores, conf_thresh=0.50, iou_thresh=0.2, max_det = 300){

    // Initialize an empty list to store the selected boxes
    const selected_detections = [];

    for (let i = 0; i < scores.length; i++) {

        // Check if the box has sufficient score to be selected
        if (scores[i] < conf_thresh) {
            continue;
            }
        var box = boxes[i];
        const score = scores[i];
        let object = box;
        let addBox = true;


        // Check for overlap with previously selected boxes
        for (let j = 0; j < selected_detections.length; j++) {
            let selectedBox = selected_detections[j];

            // Calculate the intersection and union of the two boxes
            let intersectionXmin = Math.max(object[0], selectedBox[0]);
            let intersectionYmin = Math.max(object[1], selectedBox[1]);
            let intersectionXmax = Math.min(object[2], selectedBox[2]);
            let intersectionYmax = Math.min(object[3], selectedBox[3]);
            let intersectionWidth = Math.max(0, intersectionXmax - intersectionXmin);
            let intersectionHeight = Math.max(0, intersectionYmax - intersectionYmin);
            let intersectionArea = intersectionWidth * intersectionHeight;
            let boxArea = (object[2] - object[0]) * (object[3] - object[1]);
            let selectedBoxArea = (selectedBox[2] - selectedBox[0]) * (selectedBox[3] - selectedBox[1]);
            let unionArea = boxArea + selectedBoxArea - intersectionArea;

            // Calculate the IoU and check if the boxes overlap
            let iou = intersectionArea / unionArea;
            if (iou >= iou_thresh) {
                addBox = false;
                break;
        }
        }

        // Add the box to the selected boxes list if it passed the overlap check
        if (addBox) {
            const row = box.concat(score);
            selected_detections.push(row);
        }
    }

    return selected_detections
}