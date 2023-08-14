"use strict";
exports.__esModule = true;
var image_1 = require("next/image");
var _33rd_31_png_1 = require("/public/33rd-31.png");
var _3rd_315_png_1 = require("/public/3rd-315.png");
var _2nd_21_png_1 = require("/public/2nd-21.png");
var ProductsType = function () {
    return (React.createElement("div", { className: "py-16 space-y-5" },
        React.createElement("div", { className: "text-center space-y-3" },
            React.createElement("p", { className: "text-blue-800 text-sm" }, "PROMOTIONS"),
            React.createElement("h3", { className: "text-3xl text-gray-800 font-bold" }, "Our Promotions Events")),
        React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-gray-800 mx-auto" },
            React.createElement("div", { className: "w-full flex flex-col items-center justify-between sm:flex-row col-span-1 md:col-span-2 bg-cat1 px-12" },
                React.createElement("div", { className: "max-w-[13rem] py-8" },
                    React.createElement("h4", { className: "text-3xl font-extrabold" }, "GET UP TO 60%"),
                    React.createElement("p", { className: "text-xl" }, "For the summer season")),
                React.createElement("div", { className: "w-66" },
                    React.createElement(image_1["default"], { alt: "summer season", src: _33rd_31_png_1["default"] }))),
            React.createElement("div", { className: "w-full row-span-1 md:row-span-2 flex flex-col items-center h-full bg-cat3" },
                React.createElement("div", { className: "p-4" },
                    React.createElement("p", null, "Flex Sweatshirt"),
                    React.createElement("p", { className: "text-lg" },
                        React.createElement("del", null, "$100.00"),
                        "\u00A0\u00A0\u00A0",
                        React.createElement("b", null,
                            React.createElement("ins", null, "$75.00")))),
                React.createElement("div", { className: "w-64" },
                    React.createElement(image_1["default"], { width: 1000, height: 1000, alt: "sweaters", src: _3rd_315_png_1["default"] }))),
            React.createElement("div", { className: "w-full row-span-1 md:row-span-2 flex flex-col items-center h-full bg-cat4" },
                React.createElement("div", { className: "p-4" },
                    React.createElement("p", null, "Flex Sweatshirt"),
                    React.createElement("p", { className: "text-lg" },
                        React.createElement("del", null, "$225.00"),
                        "\u00A0\u00A0\u00A0",
                        React.createElement("b", null,
                            React.createElement("ins", null, "$190.00")))),
                React.createElement("div", { className: "w-64" },
                    React.createElement(image_1["default"], { width: 1000, height: 1000, alt: "sweaters", src: _2nd_21_png_1["default"] }))),
            React.createElement("div", { className: "py-9 text-white w-full col-auto md:col-span-2 bg-cat2 flex flex-col justify-center items-center space-y-3" },
                React.createElement("h3", { className: "font-extrabold text-4xl" }, "GET 30% Off"),
                React.createElement("p", null, "USE PROMO CODE"),
                React.createElement("button", { "aria-label": "Redirect user to Dine Week End Sale", className: "py-1 px-8 text-lg font-medium bg-[#474747] rounded-lg tracking-widest" }, "DINEWEEKENDSALE")))));
};
exports["default"] = ProductsType;
