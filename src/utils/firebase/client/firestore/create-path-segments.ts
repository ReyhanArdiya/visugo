const createPathSegments = (basePaths: string[], additionalPaths?: string[])=> {
	if (additionalPaths) {
		return basePaths.concat(additionalPaths);
	}

	return basePaths;
};

export default createPathSegments;