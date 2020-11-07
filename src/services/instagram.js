// import axios from axios;

// const INSTAGRAM_TOKEN = 'IGQVJVOXMwTzZABM2ZARU2pRajM3UmFQMllSWE1UUmlwWnU1aE9GOXpDdzdVTFZAFSnpkWmNMMllUQlBkeTFvNm01WElEbS1wRE5DN1ZAnZAGh4UGpqSjFfeU1UeUkwcHJJeTlXZA2JFSjFGSzBlSlRPMGZAEUgZDZD';
// const API_URL = "https://graph.instagram.com/me/media?fields=";
// const API_FIELDS = "caption,media_url,media_type,permalink,timestamp,username";


// const getInstagramPosts = () => {
//     const url = API_URL + API_FIELDS + "&access_token=" + INSTAGRAM_TOKEN;
//     const body = {

//     };
//     axios.get(url, body)
//         .then((res) => {
//             console.log(res);
//             console.log(res.data);
//         });
// }

// export default getInstagramPosts;


// (function ($, window, document, undefined) {
//   var Instagram = {
//     API_URL: "https://graph.instagram.com/me/media?fields=",
//     API_FIELDS: "caption,media_url,media_type,permalink,timestamp,username",

//     /**
//      * Initializes the plugin.
//      * @param {object} options
//      * @param {jQuery Object} elem
//      */
//     initialize: function (options, elem) {
//       this.elem = elem;
//       this.$elem = $(elem);
//       (this.accessToken = $.fn.FCInstagram.accessData.accessToken),
//         (this.options = $.extend({}, $.fn.FCInstagram.options, options));

//       this.messages = {
//         defaultImageAltText: "Instagram Photo",
//         notFound: "This user account is private or doesn't have any photos.",
//       };

//       this.getPhotos();
//     },

//     /**
//      * Calls the fetch function and work with the response.
//      */
//     getPhotos: function () {
//       var self = this;
//     //   messages = null;

//       self.fetch().done(function (results) {
//         if (results.data) {
//           self.displayPhotos(results);
//         } else if (results.error.message) {
//           $.error("FCInstagram.js - Error: " + results.error.message);
//         } else {
//           $.error("FCInstagram.js - Error: user does not have photos.");
//         }
//       });
//     },

//     /**
//      * Makes the ajax call and returns the result.
//      */
//     fetch: function () {
//       var getUrl =
//         this.API_URL + this.API_FIELDS + "&access_token=" + this.accessToken;

//       return $.ajax({
//         type: "GET",
//         dataType: "jsonp",
//         cache: false,
//         url: getUrl,
//       });
//     },

//     /**
//      * Appends the markup to the DOM with the images.
//      * @param {object} results
//      */
//     displayPhotos: function (results) {
//       var $element,
//         $video,
//         hasCaption,
//         imageGroup = [],
//         imageCaption,
//         autoplay,
//         max;

//       max =
//         this.options.max >= results.data.length
//           ? results.data.length
//           : this.options.max;

//       if (results.data === undefined || results.data.length === 0) {

//         this.$elem.append(this.messages.notFound);

//         return;
//       }

//       for (var i = 0; i < max; i++) {
//         if (
//           results.data[i].media_type === "IMAGE" ||
//           results.data[i].media_type === "CAROUSEL_ALBUM"
//         ) {
//           hasCaption =
//             results.data[i].caption !== null ||
//             results.data[i].caption !== undefined;

//           imageCaption = hasCaption
//             ? $("<span>").text(results.data[i].caption).html()
//             : this.messages.defaultImageAltText;

//           $element = $("<a>", {
//             href: results.data[i].permalink,
//             target: "_blank",
//             title: imageCaption,
//             style:
//               "background:url(" +
//               results.data[i].media_url +
//               ") no-repeat center / cover;",
//             rel: "nofollow",
//           });

//           // Add item
//           imageGroup.push($element);

//         } else if (results.data[i].media_type === "VIDEO") {
//           autoplay =
//             this.options.autoplay == true
//               ? "autoplay muted loop playsinline"
//               : "";

//           $source = $("<source>", {
//             src: results.data[i].media_url,
//             type: "video/mp4",
//           });

//           $video = $("<video " + autoplay + ">").append($source);

//           $element = $("<a>", {
//             href: results.data[i].permalink,
//             target: "_blank",
//             title: imageCaption,
//             rel: "nofollow",
//           }).append($video);
        
//           // Add item
//           imageGroup.push($element);

//         }
//       }

//       this.$elem.append(imageGroup);

//       if (typeof this.options.complete === "function") {
//         this.options.complete.call(this);
//       }
//     },
//   };

//   /**
//    * FCInstagram Plugin Definition.
//    */
//   jQuery.fn.FCInstagram = function (options) {
//     if (jQuery.fn.FCInstagram.accessData.accessToken) {
//       this.each(function () {
//         var instagram = Object.create(Instagram);

//         instagram.initialize(options, this);
//       });
//     } else {
//       $.error("You must define an accessToken on jQuery.FCInstagram");
//     }
//   };

//   // Plugin Default Options.
//   jQuery.fn.FCInstagram.options = {
//     complete: null,
//     max: 9,
//     autoplay: false
//   };

//   // Instagram Access Data.
//   jQuery.fn.FCInstagram.accessData = {
//     accessToken: null,
//   };
// })(jQuery, window, document);
