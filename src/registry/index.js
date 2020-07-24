let registry = {};

export const register = (key, value) => {
    registry = { ...registry, [key]: value };
};

export const useRegistry = () => {
    return registry;
};
