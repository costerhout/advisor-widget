/**
* @Author: Colin Osterhout <ctosterhout>
* @Date:   2016-11-03T13:58:03-08:00
* @Email:  ctosterhout@alaska.edu
* @Project: advisor-finder
* @Last modified by:   ctosterhout
* @Last modified time: 2016-11-03T14:03:37-08:00
* @License: Released under MIT License. Copyright 2016 University of Alaska Southeast.  For more details, see https://opensource.org/licenses/MIT
*/

require(['jquery'], function ($) {
    $(function () {
        'use strict';

        $('#advisor-finder .form-horizontal').each(function () {
            $(this).removeClass('form-horizontal').addClass('form-vertical');
        });
    });
});
