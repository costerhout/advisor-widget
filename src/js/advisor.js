/**
* @Author: Colin Osterhout <ctosterhout>
* @Date:   2016-09-13T16:54:47-08:00
* @Email:  ctosterhout@alaska.edu
* @Project: advisor-widget
* @Last modified by:   ctosterhout
* @Last modified time: 2016-09-13T19:25:59-08:00
* @License: Released under MIT License. Copyright 2016 University of Alaska Southeast.  For more details, see https://opensource.org/licenses/MIT
*/

/*

Spreadsheet content
    - Table for program: location: degree: advisor tuples
    - Table for advisors to key


CMS contents
    - Advisor to directory linkage (one or more)
        - key
        - directory page (one or more)

Transform
    - Inputs: content block (advisor to directory linkage)
    - Outputs: set of <div.advisor-pane> elements, each with an ID

    Advisor pane with one advisor
    <div class="advisor-pane">
        <!-- Content generated by Personnel template with mode="personnel-condensed" from bs2-personnel -->
        <!-- Or from bs2-personnel-list with mode "personnel-list" -->
    </div>

CSS - the JavaScript will set the individual blocks to be displayed as the logic dictates

    .advisor-pane {
        display: none;
    }

Special notes:

*/

/*
Notes on future generalization

inputs:
    object
        tuples
        definition: array of objects representing fields
            name
            HTML select element to populate
            Not selected label
            callback function to be called when the field is uniquely specified
*/
require(['underscore', 'jquery', 'lib/mixins'], function (_, $) {

    $(function () {
        'use strict';

        // DOM is ready
        var tuples = [
            { degree: "Occupational Endorsement", program: "Accounting", location: "Online", advisor: "link28"},
            { degree: "Occupational Endorsement", program: "Accounting", location: "Juneau", advisor: "link28"},
            { degree: "Occupational Endorsement", program: "Building Energy Retrofit Technician", location: "Juneau", advisor: "link28"},
            { degree: "Occupational Endorsement", program: "Certified Nurse Aide Training", location: "Juneau", advisor: "link4"},
            { degree: "Occupational Endorsement", program: "Certified Nurse Aide Training", location: "Sitka", advisor: "link3"},
            { degree: "Occupational Endorsement", program: "Certified Nurse Aide Training", location: "Ketchikan", advisor: "link8"},
            { degree: "Occupational Endorsement", program: "Construction Technology", location: "Juneau", advisor: "link28"},
            { degree: "Occupational Endorsement", program: "Construction Technology", location: "Sitka", advisor: "link2"},
            { degree: "Occupational Endorsement", program: "Construction Technology", location: "Ketchikan", advisor: "link8"},
            { degree: "Occupational Endorsement", program: "Financial Institutions", location: "Online", advisor: "link28"},
            { degree: "Occupational Endorsement", program: "Fisheries Technology", location: "Online", advisor: "link2"},
            { degree: "Occupational Endorsement", program: "Fisheries Technology", location: "Sitka", advisor: "link2"},
            { degree: "Occupational Endorsement", program: "Healthcare Information Technology", location: "Online", advisor: "link3"},
            { degree: "Occupational Endorsement", program: "Healthcare Information Technology", location: "Sitka", advisor: "link3"},
            { degree: "Occupational Endorsement", program: "Law Enforcement", location: "Sitka", advisor: "link2"},
            { degree: "Occupational Endorsement", program: "Marine Transportation", location: "Ketchikan", advisor: "link16"},
            { degree: "Occupational Endorsement", program: "Marine Transportation", location: "Online", advisor: "link16"},
            { degree: "Occupational Endorsement", program: "Northwest Coast Art", location: "Juneau", advisor: "link6"},
            { degree: "Occupational Endorsement", program: "Power Technology - Diesel/Heavy Duty", location: "Juneau", advisor: "link28"},
            { degree: "Occupational Endorsement", program: "Power Technology - Diesel/Marine", location: "Juneau", advisor: "link28"},
            { degree: "Occupational Endorsement", program: "Power Technology - Mine Mechanic", location: "Juneau", advisor: "link28"},
            { degree: "Occupational Endorsement", program: "Welding", location: "Sitka", advisor: "link1"},
            { degree: "Certificate", program: "Accounting Technician", location: "Online", advisor: "link28"},
            { degree: "Certificate", program: "Accounting Technician", location: "Juneau", advisor: "link28"},
            { degree: "Certificate", program: "Automotive Technology", location: "Juneau", advisor: "link28"},
            { degree: "Certificate", program: "Drafting Technology", location: "Juneau", advisor: "link28"},
            { degree: "Certificate", program: "Fisheries Technology", location: "Online", advisor: "link2"},
            { degree: "Certificate", program: "Fisheries Technology", location: "Sitka", advisor: "link2"},
            { degree: "Certificate", program: "Health Information Management Coding Specialist", location: "Online", advisor: "link3"},
            { degree: "Certificate", program: "Health Information Management Coding Specialist", location: "Sitka", advisor: "link3"},
            { degree: "Certificate", program: "Healthcare Privacy and Security", location: "Online", advisor: "link3"},
            { degree: "Certificate", program: "Healthcare Privacy and Security", location: "Sitka", advisor: "link3"},
            { degree: "Certificate", program: "Medical Assisting", location: "Sitka", advisor: "link2"},
            { degree: "Certificate", program: "Medical Assisting", location: "Online", advisor: "link2"},
            { degree: "Certificate", program: "Outdoor Skills and Leadership", location: "Juneau", advisor: "link7"},
            { degree: "Certificate", program: "Pre-nursing qualifications", location: "Juneau", advisor: "link28"},
            { degree: "Certificate", program: "Pre-nursing qualifications", location: "Ketchikan", advisor: "link8"},
            { degree: "Certificate", program: "Pre-nursing qualifications", location: "Sitka", advisor: "link3"},
            { degree: "Certificate", program: "Pre-nursing qualifications", location: "Online", advisor: "link3"},
            { degree: "Certificate", program: "Pre-radiologic Technology Qualifications", location: "Online", advisor: "link3"},
            { degree: "Certificate", program: "Pre-radiologic Technology Qualifications", location: "Sitka", advisor: "link3"},
            { degree: "Certificate", program: "Pre-radiologic Technology Qualifications", location: "Ketchikan", advisor: "link8"},
            { degree: "Certificate", program: "Pre-radiologic Technology Qualifications", location: "Juneau", advisor: "link4"},
            { degree: "Certificate", program: "Small Business Management", location: "Online", advisor: "link28"},
            { degree: "Certificate", program: "Small Business Management", location: "Juneau", advisor: "link28"},
            { degree: "Associate of Applied Science (AAS)", program: "Business Administration", location: "Online", advisor: "link28"},
            { degree: "Associate of Applied Science (AAS)", program: "Business Administration", location: "Juneau", advisor: "link28"},
            { degree: "Associate of Applied Science (AAS)", program: "Construction Technology", location: "Juneau", advisor: "link28"},
            { degree: "Associate of Applied Science (AAS)", program: "Fisheries Technology", location: "Sitka", advisor: "link2"},
            { degree: "Associate of Applied Science (AAS)", program: "Fisheries Technology", location: "Online", advisor: "link2"},
            { degree: "Associate of Applied Science (AAS)", program: "Health Information Management", location: "Sitka", advisor: "link3"},
            { degree: "Associate of Applied Science (AAS)", program: "Health Information Management", location: "Online", advisor: "link3"},
            { degree: "Associate of Applied Science (AAS)", program: "Health Sciences", location: "Juneau", advisor: "link4"},
            { degree: "Associate of Applied Science (AAS)", program: "Health Sciences", location: "Ketchikan", advisor: "link8"},
            { degree: "Associate of Applied Science (AAS)", program: "Health Sciences", location: "Sitka", advisor: "link3"},
            { degree: "Associate of Applied Science (AAS)", program: "Health Sciences", location: "Online", advisor: "link3"},
            { degree: "Associate of Applied Science (AAS)", program: "Law Enforcement", location: "Sitka", advisor: "link2"},
            { degree: "Associate of Applied Science (AAS)", program: "Law Enforcement", location: "Online", advisor: "link2"},
            { degree: "Associate of Applied Science (AAS)", program: "Marine Transportation", location: "Ketchikan", advisor: "link4"},
            { degree: "Associate of Applied Science (AAS)", program: "Power Technology - Diesel", location: "Juneau", advisor: "link28"},
            { degree: "Associate of Applied Science (AAS)", program: "Power Technology - Mine Mechanic", location: "Juneau", advisor: "link28"},
            { degree: "Associate of Arts (AA)", program: "General Education", location: "Juneau", advisor: "link28"},
            { degree: "Associate of Arts (AA)", program: "General Education", location: "Ketchikan", advisor: "link10"},
            { degree: "Associate of Arts (AA)", program: "General Education", location: "Sitka", advisor: "link2"},
            { degree: "Associate of Arts (AA)", program: "General Education", location: "Online", advisor: "link11"},
            { degree: "Associate of Arts (AA)", program: "General Education", location: "Online", advisor: "link2"},
            { degree: "Associate of Science (AS)", program: "General Education", location: "Juneau", advisor: "link28"},
            { degree: "Associate of Science (AS)", program: "General Education", location: "Ketchikan", advisor: "link11"},
            { degree: "Associate of Science (AS)", program: "General Education", location: "Sitka", advisor: "link2"},
            { degree: "Associate of Science (AS)", program: "General Education", location: "Online", advisor: "link11"},
            { degree: "Associate of Science (AS)", program: "General Education", location: "Online", advisor: "link2"},
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
            { degree: "Bachelor of Science (BS)", program: "Geography and Environmental Studies", location: "Juneau", advisor: "link6"},
            { degree: "Bachelor of Science (BS)", program: "Marine Biology", location: "Juneau", advisor: "link6"},
            { degree: "Bachelor of Science (BS)", program: "Mathematics", location: "Juneau", advisor: "link6"},
            { degree: "Bachelor of Business Administration (BBA)", program: "Accounting, Human Resource Management, Management, Management Information System", location: "Online", advisor: "link28"},
            { degree: "Bachelor of Business Administration (BBA)", program: "Accounting, Human Resource Management, Management, Management Information System", location: "Juneau", advisor: "link28"},
            { degree: "Master of Public Administration (MPA)", program: "General, Natural Resource Policy, Rural Development", location: "Online", advisor: "link12"},
            { degree: "Master of Public Administration (MPA)", program: "General, Natural Resource Policy, Rural Development", location: "Juneau", advisor: "link12"},
            { degree: "Master of Arts in Teaching (MAT)", program: "Elementary Education ", location: "Online", advisor: "link13"},
            { degree: "Master of Arts in Teaching (MAT)", program: "Secondary and Middle Grades Education", location: "Online", advisor: "link28"},
            { degree: "Master of Arts in Teaching (MAT)", program: "Secondary and Middle Grades Education", location: "Juneau", advisor: "link28"},
            { degree: "Master of Arts in Teaching (MAT)", program: "Special Education", location: "Online", advisor: "link10"},
            { degree: "Master of Education", program: "Educational Leadership - Superintendent", location: "Online", advisor: "link9"},
            { degree: "Master of Education", program: "Educational Leadership - Superintendent", location: "Juneau", advisor: "link9"},
            { degree: "Master of Education", program: "Educational Leadership - Principal", location: "Online", advisor: "link9"},
            { degree: "Master of Education", program: "Educational Leadership - Principal", location: "Juneau", advisor: "link9"},
            { degree: "Master of Education", program: "Learning Design and Technology", location: "Online", advisor: "link15"},
            { degree: "Master of Education", program: "Mathematics Education", location: "Online", advisor: "link28"},
            { degree: "Master of Education", program: "Reading Specialist", location: "Online", advisor: "link16"},
            { degree: "Master of Education", program: "Science Education K-8", location: "Online", advisor: "link15"},
            { degree: "Master of Education", program: "Special Education", location: "Online", advisor: "link10"},
            { degree: "Graduate Certificate", program: "Educational Technology", location: "Online", advisor: "link15"},
            { degree: "Graduate Certificate", program: "Elementary Education K-8", location: "Online", advisor: "link13"},
            { degree: "Graduate Certificate", program: "Mathematics Education K-5", location: "Online", advisor: "link28"},
            { degree: "Graduate Certificate", program: "Mathematics Education K-8", location: "Online", advisor: "link28"},
            { degree: "Graduate Certificate", program: "Reading Specialist", location: "Online", advisor: "link16"},
            { degree: "Graduate Certificate", program: "Secondary Education", location: "Online", advisor: "link28"},
            { degree: "Graduate Certificate", program: "Secondary Education", location: "Juneau", advisor: "link28"},
            { degree: "Graduate Certificate", program: "Special Education ", location: "Juneau", advisor: "link10"},
            { degree: "Graduate Certificate", program: "Special Education ", location: "Online", advisor: "link10"}
        ],
        $result = $('#advisor-result'),
        $degree = $('#advisor-degree'),
        $program = $('#advisor-program'),
        $location = $('#advisor-location'),
        $reset = $('#advisor-reset'),
        optionNotSelected = { label: 'Not selected', value: 'N/A' },
        populateForm = function (tuples) {
            var optionsDegrees = _.map(_.uniq(_.pluck(tuples, 'degree')), function (val) {
                    return { label: val, value: val };
                }),
                optionsPrograms = _.map(_.uniq(_.pluck(tuples, 'program')), function (val) {
                    return { label: val, value: val };
                }),
                optionsLocations = _.map(_.uniq(_.pluck(tuples, 'location')), function (val) {
                    return { label: val, value: val };
                }),
                createOption = function (label, value) {
                    return _.createElement(label, 'option', false, { value: value });
                },
                addNotSelectedIfMultiple = function (options) {
                    if (options.length > 1) {
                        options.unshift(optionNotSelected);
                    }

                    return options;
                },
                // Initialize the options for display - if there's multiple to choose from remain not selected
                // Otherwise save away the current value of the field
                degree = optionsDegrees.length > 1 ? optionNotSelected.value : optionsDegrees[0].value,
                program = optionsPrograms.length > 1 ? optionNotSelected.value : optionsPrograms[0].value,
                location = optionsLocations.length > 1 ? optionNotSelected.value : optionsLocations[0].value;


            // Add the not-selected option to each set
            addNotSelectedIfMultiple(optionsDegrees);
            addNotSelectedIfMultiple(optionsPrograms);
            addNotSelectedIfMultiple(optionsLocations);

            // Empty out the current set of tuples
            $degree.empty();
            $program.empty();
            $location.empty();

            // Populate the form with the types of degrees available
            _.each(optionsDegrees, function (option) {
                $degree.append(createOption(option.label, option.value));
            });

            // Populate the form with the types of programs available
            _.each(optionsPrograms, function (option) {
                $program.append(createOption(option.label, option.value));
            });

            // Populate the form with the locations available
            _.each(optionsLocations, function (option) {
                $location.append(createOption(option.label, option.value));
            });

            // Now select what had previously been selected, or the only one available
            $degree.val(degree);
            $program.val(program);
            $location.val(location);
        },
        onChange = function () {
            var degree = $degree.val(),
                program = $program.val(),
                location = $location.val(),
                tupleSelect = _.pick({ degree: degree, program: program, location: location }, function (val) {
                    return (val !== 'N/A');
                }),
                tuplesFiltered = _.where(tuples, tupleSelect),
                advisors = _.uniq(_.pluck(tuplesFiltered, 'advisor'));

            // Populate the form with the new filtered values
            populateForm(tuplesFiltered);

            // If there's only one unique advisor than display it / him / her
            if (advisors.length === 1) {
                $('#' + advisors[0]).show();
            }
        };

        // Hook into the onchange event for each drop down
        _.each([$degree, $program, $location], function ($o) {
            $o.change(onChange);
        });

        // Hook the reset button up
        $reset.click(function () {
            // Hide all advisor panes
            $('.advisor-pane').hide();
            // Repopulate the list
            populateForm(tuples);
        });

        // Populate the initial form
        populateForm(tuples);
    });
});