import generic from './FeatureTypes/generic';
import meta from './FeatureTypes/meta';
import airSensors from './FeatureTypes/airSensors';
import displays from './FeatureTypes/displays';
import distanceSensors from './FeatureTypes/distanceSensors';
import energySensors from './FeatureTypes/energySensors';
import lightSensors from './FeatureTypes/lightSensors';
import temphumpressSensors from './FeatureTypes/temphumpressSensors';

export const featureTypes = ['generic', 'air', 'display', 'distance', 'energy', 'light', 'temphumpress'];

const availableFeatures = [...generic, ...meta, ...airSensors, ...displays, ...distanceSensors, ...energySensors, ...lightSensors, ...temphumpressSensors];

export default availableFeatures;
