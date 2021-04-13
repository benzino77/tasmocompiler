import generic from './FeatureTypes/Generic';
import meta from './FeatureTypes/Meta';
import airSensors from './FeatureTypes/AirSensors';
import displays from './FeatureTypes/Displays';
import distanceSensors from './FeatureTypes/DistanceSensors';
import energySensors from './FeatureTypes/EnergySensors';
import lightSensors from './FeatureTypes/LightSensors';
import temphumpressSensors from './FeatureTypes/TempHumPressSensors';

export const featureTypes = ['generic', 'air', 'display', 'distance', 'energy', 'light', 'temphumpress'];

const availableFeatures = [...generic, ...meta, ...airSensors, ...displays, ...distanceSensors, ...energySensors, ...lightSensors, ...temphumpressSensors];

export default availableFeatures;
