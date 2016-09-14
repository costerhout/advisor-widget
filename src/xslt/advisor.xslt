<?xml version="1.0" encoding="UTF-8"?>

<!--
@Author: Colin Osterhout <ctosterhout>
@Date:   2016-09-08T15:09:26-08:00
@Email:  ctosterhout@alaska.edu
@Project: BERT
@Last modified by:   ctosterhout
@Last modified time: 2016-09-13T19:16:48-08:00
@License: Released under MIT License. Copyright 2016 University of Alaska Southeast.  For more details, see https://opensource.org/licenses/MIT
-->

<xsl:stylesheet
    version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xd="http://www.pnp-software.com/XSLTdoc"
    xmlns:exsl="http://exslt.org/common"
    xmlns:string="my:string"
    exclude-result-prefixes="string xd exsl"
    >

    <xsl:import href="../../../bert/src/xslt/bs2/bs2-default.xslt"/>
    <xsl:import href="../../../bert/src/xslt/include/error.xslt"/>
    <xsl:import href="../../../bert/src/xslt/include/string.xslt"/>

    <xd:doc type="stylesheet">
        <xd:short>Custom stylesheet to match the "blocks only" data definition in order to output program to advisor information.</xd:short>
        <xd:detail>
            <p>This stylesheet is intended to be applied directly to a "blocks only" system-data-structure which contains either references to advisor contact information, links to custom XHTML content, or WYSIWYG content.  Each "blocks" item is output in its own div with unique ID and intended to be normally hidden. Javascript code should be used to show advisor divs by their block ID.</p>
        </xd:detail>
        <xd:author>Colin Osterhout (ctoterhout@alaska.edu)</xd:author>
        <xd:copyright>University of Alaska Southeast, 2016</xd:copyright>
    </xd:doc>

    <xsl:strip-space elements="*"/>
    <xsl:output
          method='html'
          indent='yes'
          omit-xml-declaration='yes'
          />

    <xd:doc>
        <xd:short>Template to match the top level "system-data-structure"</xd:short>
        <xd:detail>
            <p>Wraps the apply-templates invocation on the blocks elements contained within.</p>
        </xd:detail>
    </xd:doc>
    <xsl:template match="system-data-structure[blocks]">
        <!-- For each block generate a DIV with a personnel entry -->
        <xsl:apply-templates select="blocks"/>
    </xsl:template>

    <xd:doc>
        <xd:short>Matching template to match on the "blocks" definition, which in this instance is just a link from an ID to contact information</xd:short>
        <xd:detail>
            <p>Each "blocks" definition holds either a link to one or more personnel pages and/or handcoded contact information in the WYSIWYG or linked content block. Each set of contact information is output in a div which is normally kept hidden from display until made visible by the advisor contact widget. File attachments are not supported.</p>
        </xd:detail>
    </xd:doc>
    <xsl:template match="blocks">
        <!-- Sanity check: Check for valid HTML ID -->
        <xsl:variable name="rtfValidNodes">
            <nodedefs>
                <node>
                    <path>id</path>
                    <level>error</level>
                    <regex>^(?:[a-zA-Z][\w:.-]*)?$</regex>
                    <flags></flags>
                    <message>Invalid HTML ID specified</message>
                </node>
            </nodedefs>
        </xsl:variable>

        <xsl:call-template name="validate-nodes">
            <xsl:with-param name="nsValidDef" select="exsl:node-set($rtfValidNodes)"/>
        </xsl:call-template>

        <!-- Is there an ID associated with this grid structure? -->
        <xsl:variable name="idSanitized">
            <xsl:if test="id[text() != '']">
                <xsl:value-of select="string:sanitizeHtmlId(string(id))"/>
            </xsl:if>
        </xsl:variable>

        <!-- Wrap the entire thing in a div with the "advisor-pane" class -->
        <div id="{$idSanitized}" class="advisor-pane">
            <!-- Determine if there is WYSIWYG content to display first -->
            <xsl:if test="content != ''">
                <xsl:call-template name="paragraph-wrap">
                    <xsl:with-param name="nodeToWrap" select="content"/>
                </xsl:call-template>
            </xsl:if>

            <!-- Are there any content blocks to output? -->
            <xsl:apply-templates select="ablock[path != '/']"/>

            <!-- Dump out a condensed personnel display for each personnel page -->
            <xsl:apply-templates select="page//Personnel" mode="personnel-condensed"/>
        </div>
    </xsl:template>
</xsl:stylesheet>
