$(document).ready(function () {
    // Function to handle selection changes
    function handleSelection() {
        const selectedGamme = $(this).val();
        const selectedPrice = $(this).find('option:selected').data('price');
        console.log("Selected Gamme: ", selectedGamme);

        $('#selectedPrice').text(selectedPrice);

        // Reset opacity for all elements and remove 'inactive' class
        $(".s_pricing-comparison__feature, .s_pricing-comparison__badge").removeClass("inactive");

        // Apply opacity of 1 to elements corresponding to the selected gamme
        $(".s_pricing-comparison__feature, .s_pricing-comparison__badge").each(function () {
            const gammes = $(this).data("gamme").split(" ");
            if (!gammes.includes(selectedGamme)) {
                $(this).addClass("inactive");
            }
        });
    }

    // Attach the change event to the selector
    $("#PricingComparisonSelector_Options").change(handleSelection);

    // Get all available options
    const allOptions = $("#PricingComparisonSelector_Options option");

    // Choose a random option
    const randomIndex = Math.floor(Math.random() * allOptions.length);
    const randomOptionValue = $(allOptions[randomIndex]).val();

    // Set the random value as the default value
    $("#PricingComparisonSelector_Options").val(randomOptionValue);

    // Manually trigger the change event to apply the default selection
    $("#PricingComparisonSelector_Options").trigger("change");
});
