/**
* @Author: Colin Osterhout <ctosterhout>
* @Date:   2016-09-13T16:54:47-08:00
* @Email:  ctosterhout@alaska.edu
* @Project: advisor-widget
 * @Last modified by:   ctosterhout
 * @Last modified time: 2017-07-28T13:21:47-08:00
* @License: Released under MIT License. Copyright 2016 University of Alaska Southeast.  For more details, see https://opensource.org/licenses/MIT
*/

require(['underscore', 'jquery', 'lib/mixins'], function (_, $) {

    $(function () {
        'use strict';

        // DOM is ready
        var tuples = [
            { degree: "Occupational Endorsement", program: "Accounting", location: "Online", advisor: "link18"},
{ degree: "Occupational Endorsement", program: "Accounting", location: "Juneau", advisor: "link18"},
{ degree: "Occupational Endorsement", program: "Building Energy Retrofit Technician", location: "Juneau", advisor: "link20"},
{ degree: "Occupational Endorsement", program: "Certified Nurse Aide Training", location: "Juneau", advisor: "link30"},
{ degree: "Occupational Endorsement", program: "Certified Nurse Aide Training", location: "Sitka", advisor: "link3"},
{ degree: "Occupational Endorsement", program: "Certified Nurse Aide Training", location: "Ketchikan", advisor: "link8"},
{ degree: "Occupational Endorsement", program: "Construction Technology", location: "Juneau", advisor: "link20"},
{ degree: "Occupational Endorsement", program: "Construction Technology", location: "Sitka", advisor: "link2"},
{ degree: "Occupational Endorsement", program: "Construction Technology", location: "Ketchikan", advisor: "link8"},
{ degree: "Occupational Endorsement", program: "Financial Institutions", location: "Online", advisor: "link18"},
{ degree: "Occupational Endorsement", program: "Fisheries Technology", location: "Online", advisor: "link2"},
{ degree: "Occupational Endorsement", program: "Fisheries Technology", location: "Sitka", advisor: "link2"},
{ degree: "Occupational Endorsement", program: "Healthcare Information Technology", location: "Online", advisor: "link3"},
{ degree: "Occupational Endorsement", program: "Healthcare Information Technology", location: "Sitka", advisor: "link3"},
{ degree: "Occupational Endorsement", program: "Law Enforcement", location: "Sitka", advisor: "link2"},
{ degree: "Occupational Endorsement", program: "Marine Transportation", location: "Ketchikan", advisor: "link5"},
{ degree: "Occupational Endorsement", program: "Marine Transportation", location: "Online", advisor: "link5"},
{ degree: "Occupational Endorsement", program: "Northwest Coast Art", location: "Juneau", advisor: "link6"},
{ degree: "Occupational Endorsement", program: "Power Technology - Diesel/Heavy Duty", location: "Juneau", advisor: "link20"},
{ degree: "Occupational Endorsement", program: "Power Technology - Diesel/Marine", location: "Juneau", advisor: "link20"},
{ degree: "Occupational Endorsement", program: "Power Technology - Mine Mechanic", location: "Juneau", advisor: "link20"},
{ degree: "Occupational Endorsement", program: "Welding", location: "Sitka", advisor: "link1"},
{ degree: "Certificate", program: "Accounting Technician", location: "Online", advisor: "link18"},
{ degree: "Certificate", program: "Accounting Technician", location: "Juneau", advisor: "link18"},
{ degree: "Certificate", program: "Automotive Technology", location: "Juneau", advisor: "link20"},
{ degree: "Certificate", program: "Drafting Technology", location: "Juneau", advisor: "link20"},
{ degree: "Certificate", program: "Fisheries Technology", location: "Online", advisor: "link2"},
{ degree: "Certificate", program: "Fisheries Technology", location: "Sitka", advisor: "link2"},
{ degree: "Certificate", program: "Health Information Management Coding Specialist", location: "Online", advisor: "link3"},
{ degree: "Certificate", program: "Health Information Management Coding Specialist", location: "Sitka", advisor: "link3"},
{ degree: "Certificate", program: "Healthcare Privacy and Security", location: "Online", advisor: "link3"},
{ degree: "Certificate", program: "Healthcare Privacy and Security", location: "Sitka", advisor: "link3"},
{ degree: "Certificate", program: "Medical Assisting", location: "Sitka", advisor: "link26"},
{ degree: "Certificate", program: "Medical Assisting", location: "Online", advisor: "link26"},
{ degree: "Certificate", program: "Outdoor Skills and Leadership", location: "Juneau", advisor: "link7"},
{ degree: "Certificate", program: "Pre-nursing qualifications", location: "Juneau", advisor: "link20"},
{ degree: "Certificate", program: "Pre-nursing qualifications", location: "Ketchikan", advisor: "link8"},
{ degree: "Certificate", program: "Pre-nursing qualifications", location: "Sitka", advisor: "link3"},
{ degree: "Certificate", program: "Pre-nursing qualifications", location: "Online", advisor: "link3"},
{ degree: "Certificate", program: "Pre-radiologic Technology Qualifications", location: "Online", advisor: "link3"},
{ degree: "Certificate", program: "Pre-radiologic Technology Qualifications", location: "Sitka", advisor: "link3"},
{ degree: "Certificate", program: "Pre-radiologic Technology Qualifications", location: "Ketchikan", advisor: "link8"},
{ degree: "Certificate", program: "Pre-radiologic Technology Qualifications", location: "Juneau", advisor: "link20"},
{ degree: "Certificate", program: "Small Business Management", location: "Online", advisor: "link18"},
{ degree: "Certificate", program: "Small Business Management", location: "Juneau", advisor: "link18"},
{ degree: "Associate of Applied Science (AAS)", program: "Business Administration", location: "Online", advisor: "link18"},
{ degree: "Associate of Applied Science (AAS)", program: "Business Administration", location: "Juneau", advisor: "link18"},
{ degree: "Associate of Applied Science (AAS)", program: "Construction Technology", location: "Juneau", advisor: "link20"},
{ degree: "Associate of Applied Science (AAS)", program: "Fisheries Technology", location: "Sitka", advisor: "link2"},
{ degree: "Associate of Applied Science (AAS)", program: "Fisheries Technology", location: "Online", advisor: "link2"},
{ degree: "Associate of Applied Science (AAS)", program: "Health Information Management", location: "Sitka", advisor: "link3"},
{ degree: "Associate of Applied Science (AAS)", program: "Health Information Management", location: "Online", advisor: "link3"},
{ degree: "Associate of Applied Science (AAS)", program: "Health Sciences", location: "Juneau", advisor: "link20"},
{ degree: "Associate of Applied Science (AAS)", program: "Health Sciences", location: "Ketchikan", advisor: "link8"},
{ degree: "Associate of Applied Science (AAS)", program: "Health Sciences", location: "Sitka", advisor: "link3"},
{ degree: "Associate of Applied Science (AAS)", program: "Health Sciences", location: "Online", advisor: "link3"},
{ degree: "Associate of Applied Science (AAS)", program: "Marine Transportation", location: "Ketchikan", advisor: "link8"},
{ degree: "Associate of Applied Science (AAS)", program: "Power Technology - Diesel", location: "Juneau", advisor: "link20"},
{ degree: "Associate of Applied Science (AAS)", program: "Marine Transportation", location: "Ketchikan", advisor: "link8"},
{ degree: "Associate of Applied Science (AAS)", program: "Power Technology - Diesel", location: "Juneau", advisor: "link20"},
{ degree: "Associate of Applied Science (AAS)", program: "Power Technology - Mine Mechanic", location: "Juneau", advisor: "link20"},
{ degree: "Associate of Arts (AA)", program: "General Education", location: "Juneau", advisor: "link20"},
{ degree: "Associate of Arts (AA)", program: "General Education", location: "Ketchikan", advisor: "link11"},
{ degree: "Associate of Arts (AA)", program: "General Education", location: "Sitka", advisor: "link2"},
{ degree: "Associate of Arts (AA)", program: "General Education", location: "Online", sublocation: "Ketchikan", advisor: "link11"},
{ degree: "Associate of Arts (AA)", program: "General Education", location: "Online", sublocation: "Sitka", advisor: "link2"},
{ degree: "Associate of Science (AS)", program: "General Education", location: "Juneau", advisor: "link20"},
{ degree: "Associate of Science (AS)", program: "General Education", location: "Ketchikan", advisor: "link11"},
{ degree: "Associate of Science (AS)", program: "General Education", location: "Sitka", advisor: "link2"},
{ degree: "Associate of Science (AS)", program: "General Education", location: "Online", sublocation: "Ketchikan", advisor: "link11"},
{ degree: "Associate of Science (AS)", program: "General Education", location: "Online", sublocation: "Sitka", advisor: "link2"},
{ degree: "Bachelor of Arts (BA)", program: "Biology", location: "Juneau", advisor: "link6"},
{ degree: "Bachelor of Arts (BA)", program: "Elementary Education", location: "Juneau", advisor: "link9"},
{ degree: "Bachelor of Arts (BA)", program: "Elementary Education", location: "Online", advisor: "link9"},
{ degree: "Bachelor of Arts (BA)", program: "English", location: "Juneau", advisor: "link6"},
{ degree: "Bachelor of Arts (BA)", program: "Geography & Environmental Studies", location: "Juneau", advisor: "link6"},
{ degree: "Bachelor of Arts (BA)", program: "Special Education", location: "Juneau", advisor: "link10"},
{ degree: "Bachelor of Arts (BA)", program: "Special Education", location: "Online", advisor: "link10"},
{ degree: "Bachelor of Arts (BA)", program: "Social Science", location: "Juneau", advisor: "link6"},
{ degree: "Bachelor of Arts (BA)", program: "Social Science", location: "Ketchikan", advisor: "link11"},
{ degree: "Bachelor of Arts (BA)", program: "Social Science", location: "Online", advisor: "link11"},
{ degree: "Bachelor of Liberal Arts (BLA)", program: "Outdoor Studies", location: "Juneau", advisor: "link7"},
{ degree: "Bachelor of Liberal Arts (BLA)", program: "Alaska Native Languages and Studies", location: "Juneau", advisor: "link6"},
{ degree: "Bachelor of Liberal Arts (BLA)", program: "Interdisciplinary Studies", location: "Juneau", advisor: "link6"},
{ degree: "Bachelor of Liberal Arts (BLA)", program: "Interdisciplinary Studies", location: "Ketchikan", advisor: "link11"},
{ degree: "Bachelor of Liberal Arts (BLA)", program: "Interdisciplinary Studies", location: "Online", advisor: "link11"},
{ degree: "Bachelor of Science (BS)", program: "Biology ", location: "Juneau", advisor: "link6"},
{ degree: "Bachelor of Science (BS)", program: "Environmental Science", location: "Juneau", advisor: "link6"},
{ degree: "Bachelor of Science (BS)", program: "Geography and Environmental Resoucres", location: "Juneau", advisor: "link6"},
{ degree: "Bachelor of Science (BS)", program: "Marine Biology", location: "Juneau", advisor: "link6"},
{ degree: "Bachelor of Science (BS)", program: "Mathematics", location: "Juneau", advisor: "link6"},
{ degree: "Bachelor of Business Administration (BBA)", program: "Accounting, Human Resource Management, Management, Management Information System", location: "Online", advisor: "link18"},
{ degree: "Bachelor of Business Administration (BBA)", program: "Accounting, Human Resource Management, Management, Management Information System", location: "Juneau", advisor: "link18"},
{ degree: "Master of Public Administration (MPA)", program: "General, Natural Resource Policy, Rural Development", location: "Online", advisor: "link12"},
{ degree: "Master of Public Administration (MPA)", program: "General, Natural Resource Policy, Rural Development", location: "Juneau", advisor: "link12"},
{ degree: "Master of Arts in Teaching (MAT)", program: "Elementary Education ", location: "Online", advisor: "link13"},
{ degree: "Master of Arts in Teaching (MAT)", program: "Secondary and Middle Grades Education", location: "Online", advisor: "link19"},
{ degree: "Master of Arts in Teaching (MAT)", program: "Secondary and Middle Grades Education", location: "Juneau", advisor: "link19"},
{ degree: "Master of Arts in Teaching (MAT)", program: "Special Education", location: "Online", advisor: "link10"},
{ degree: "Master of Education", program: "Educational Leadership - Principal", location: "Online", advisor: "link25"},
{ degree: "Master of Education", program: "Educational Leadership - Principal", location: "Juneau", advisor: "link25"},
{ degree: "Master of Education", program: "Mathematics Education", location: "Online", advisor: "link24"},
{ degree: "Master of Education", program: "Reading Specialist", location: "Online", advisor: "link16"},
{ degree: "Master of Education", program: "Special Education", location: "Online", advisor: "link10"},
{ degree: "Master of Education", program: "Learning Design and Technolgy", location: "Online", advisor: "link24"},
{ degree: "Graduate Certificate", program: "Educational Technology", location: "Online", advisor: "link24"},
{ degree: "Graduate Certificate", program: "Elementary Education K-8", location: "Online", advisor: "link13"},
{ degree: "Graduate Certificate", program: "Mathematics Education K-5", location: "Online", advisor: "link24"},
{ degree: "Graduate Certificate", program: "Mathematics Education K-8", location: "Online", advisor: "link24"},
{ degree: "Graduate Certificate", program: "Reading Specialist", location: "Online", advisor: "link16"},
{ degree: "Graduate Certificate", program: "Secondary Education", location: "Online", advisor: "link19"},
{ degree: "Graduate Certificate", program: "Secondary Education", location: "Juneau", advisor: "link19"},
{ degree: "Graduate Certificate", program: "Special Education ", location: "Online", advisor: "link10"},
{ degree: "Educational Endorsement Area", program: "Educational Leadership - Superintendent", location: "Online", advisor: "link29"},
{ degree: "Educational Endorsement Area", program: "K-8 Education", location: "Online", advisor: "link13"},
{ degree: "Educational Endorsement Area", program: "Distance Teaching & e-Learning", location: "Online", advisor: "link15"}
        ],
        $result = $('#advisor-result'),
        $degree = $('#advisor-degree'),
        $program = $('#advisor-program'),
        $location = $('#advisor-location'),
        $instructions = $('#advisor-finder-instructions'),
        $reset = $('#advisor-reset'),
        optionNotSelected = { label: 'Not selected', value: 'N/A' },
        objectifyVal = function (val) {
            return { label: val, value: val };
        },
        rejectNA = function (val) {
            return (val !== optionNotSelected.value);
        },
        populateSelect = function ($select, options) {
            // Helper function to create an option element for insertion into select element
            var createOption = function (label, value) {
                return _.createElement(label, 'option', false, { value: value });
            },
            $btnFilter = $select.siblings(".advisor-btn-filter").first(),
            // Function for adding a "N/A" option to select fields
            addNotSelectedIfMultiple = function (options) {
                if (options.length > 1) {
                    options.unshift(optionNotSelected);
                }

                return options;
            };

            $select.empty();
            addNotSelectedIfMultiple(options);

            // Populate the form with the types of degrees available
            _.each(options, function (option) {
                $select.append(createOption(option.label, option.value));
            });

            // If only one option is present for the select then show the remove filter button
            if (options.length === 1) {
                $btnFilter.show();
            }
        },
        populateForm = function (tuples) {
            var createOptionObjects = function (aOptions) {
                    return (_.chain(aOptions)
                    .uniq()
                    .sort()
                    .map(objectifyVal)
                    .value());
                },
                // Generate the various option objects (label / value)
                optionsDegrees = createOptionObjects(_.pluck(tuples, 'degree')),
                optionsPrograms = createOptionObjects(_.pluck(tuples, 'program')),
                optionsLocations = createOptionObjects(_.pluck(tuples, 'location')),

                // Initialize the options for display - if there's multiple to choose from remain not selected
                // Otherwise save away the current value of the field
                degree = optionsDegrees.length > 1 ? optionNotSelected.value : optionsDegrees[0].value,
                program = optionsPrograms.length > 1 ? optionNotSelected.value : optionsPrograms[0].value,
                location = optionsLocations.length > 1 ? optionNotSelected.value : optionsLocations[0].value;

            // Initialize the select list
            populateSelect($degree, optionsDegrees);
            populateSelect($program, optionsPrograms);
            populateSelect($location, optionsLocations);

            // Now select what had previously been selected, or the only one available
            $degree.val(degree);
            $program.val(program);
            $location.val(location);
        },
        copyAdvisor = function (sId, htmlTitle) {
            // Copy the matched result to the result pane and then show the result with a fade
            var $output,
                aCurrentIds = $result.data('link-advisors') ? $result.data('link-advisors').split(',') : [];

            // If the requested ID isn't already in the output, then output it
            if (_.indexOf(aCurrentIds, sId) === -1){
                $output = $('#' + sId).clone().attr('id', 'advisor-result-inner').appendTo($result)
                // If there's a title specified, then insert it before the other output
                if (!_.isUndefined(htmlTitle)) {
                    $output.before(htmlTitle);
                }

                // Note the advisor set as a data attribute on the result for later use
                aCurrentIds.unshift(sId);
                $result.data('link-advisors', _.uniq(aCurrentIds).join(','));
            }
        },
        showAdvisorResult = function () {
            $instructions.hide();
            $('.advisor-pane', $result).show(200);
        },
        clearAdvisorResult = function () {
            $('.advisor-pane').hide();
            $instructions.show();
            $result.empty();
            $result.removeData()
        },
        onChange = function (e) {
            var $e = $(e.target).is('button') ? $(e.target) : $(e.target).parent('button'),
                degree = $degree.val(),
                program = $program.val(),
                location = $location.val(),
                // Get the selected values (not the N/A ones though) as a tuple
                tupleSelect = _.pick({ degree: degree, program: program, location: location }, rejectNA);

            // Change the select options as needed
            applyFilter(tupleSelect);
        },
        applyFilter = function (tupleSelect) {
            var tuplesFiltered = _.where(tuples, tupleSelect),
                aTuplePartition = _.partition(tuplesFiltered, function (tuple) { return _.isUndefined(tuple.sublocation); }),
                tuplesSublocation = aTuplePartition[1],
                tuplesNosublocation = aTuplePartition[0];

            // If each tuplesFiltered item only differ by a sublocation, then display all advisors (sublocations)
            if ( (tuplesSublocation.length === tuplesFiltered.length) && (tuplesSublocation.length !== 0) ){
                // Copy over all the sublocations' advisor information to the result pane along with a title
                _.each(tuplesSublocation, function (tuple) {
                    copyAdvisor(tuple.advisor, _.createElement('Through ' + tuple.sublocation, 'h2', false));
                });

                // Show the advisor result pane
                showAdvisorResult();
            } else if ( (tuplesSublocation.length === 0) && (tuplesFiltered.length === 1) ) {
                // Copy over the sole advisor result to the advisor result pane
                copyAdvisor(tuplesFiltered[0].advisor);

                // Show the advisor result pane
                showAdvisorResult();
            } else {
                clearAdvisorResult();
            }

            $('#advisor-reset-controls').show();
            populateForm(tuplesFiltered);
        },
        resetAdvisorWidget = function () {
            // Hide all advisor panes, remove the result DIV, hide the reset button
            clearAdvisorResult();
            $('#advisor-reset-controls').hide();

            // Repopulate the list
            populateForm(tuples);
        };

        // Hook into the onchange event for each drop down
        $('.advisor-select').change(onChange);

        // Hook the reset button up
        $reset.click(resetAdvisorWidget);

        // Reset everything
        resetAdvisorWidget();

        // Show widget itself
        $('#advisor-finder').show();
    });
});
