const { DateTime } = require("luxon");
const TIME_ZONE = "America/New_York";



module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/css/");
    eleventyConfig.addPassthroughCopy("src/assets/");

    eleventyConfig.addWatchTarget("src/css/");
    eleventyConfig.addWatchTarget("src/assets/");

    eleventyConfig.addCollection('posts', function(collectionApi) {
        return collectionApi.getFilteredByGlob('src/blog/**/*.html');
    })

    eleventyConfig.addCollection('ocs', function(collectionApi) {
        return collectionApi.getFilteredByGlob('src/ocs/**/*.html');
    })

    eleventyConfig.addDateParsing(function(dateValue) {
		let localDate;
		if(dateValue instanceof Date) { // override YAML dates
			localDate = DateTime.fromJSDate(dateValue, { zone: "utc" }).setZone(TIME_ZONE, { keepLocalTime: true });
		} else if(typeof dateValue === "string") { // override String dates
			localDate = DateTime.fromISO(dateValue, { zone: TIME_ZONE });
		}
		if (localDate?.isValid === false) {
			throw new Error(`Invalid \`date\` value(${dateValue}) is invalid for ${this.page.inputPath}`);
		}
		return localDate;
	});

    eleventyConfig.addFilter("formatDate", (dateString) => {
    dateObj = new Date(dateString);
    return DateTime.fromJSDate(dateObj).toFormat('yyyy/MM/dd | hh:mm a');
    });

    return {
        dir: {
            input: 'src',
            includes: '_includes',
            output: '_site',
        },
        templateFormats: ['md', 'njk', 'html'],
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
    }
    
};
