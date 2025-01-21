import { FastAverageColor } from 'fast-average-color';
import { colorInThreshold } from "../utils/albumUtilFunctions";

export async function getAverageColor(imgUrl) {
  const fastAvgColor = new FastAverageColor();
  const ignoredColors = [[255, 255, 255, 255, 5], [0, 0, 0, 255, 5]];
  try {
    let color = await fastAvgColor.getColorAsync(imgUrl, {
      algorithm: 'dominant', // Use 'dominant' algorithm, retry with 'average' if not in threshold
    });
    console.log("color hex", color.hex);
    if(!colorInThreshold(color.hex)){
      color = await fastAvgColor.getColorAsync(imgUrl, {
        ignoredColor: [ignoredColors],
      });
    }
    return color.hex;
  } catch (e) {
    console.log(e);
  }
};