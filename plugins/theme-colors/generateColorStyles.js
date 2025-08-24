const generateRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
};

const generateColorStyles = (colors, prefix) => {
    const styles = {};
    Object.entries(colors).forEach(([shade, hex]) => {
        styles[`--colors-${prefix}-${shade}`] = hex;
        styles[`--colors-${prefix}-${shade}-rgb`] = generateRgb(hex);
    });
    return styles;
};

module.exports = generateColorStyles;
