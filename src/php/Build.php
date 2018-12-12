<?php

/**
 * GM::Creator
 * Copyright (C) Simon Raichl 2018
 * MIT License
 */

require("IBuild.php");

final class Build implements IBuild
{

    private $bundle = [
        "../html/index.html",
        "bundle/shared/Transpiler.js",
        "bundle/shared/ImageParser.js",
        "bundle/shared/GMCLang.js",
        "bundle/shared/ErrorMessage.js",
        "bundle/shared/Canvas.js",
        "lib/Movement.js",
        "Runtime.js",
        "Core.js"
    ];

    private $rules = [
        false => ["", ""],
        true  => ["<script>", "</script>"],
    ];

    private $root = "../js/";
    private $content = "";
    private $patterns = [];

    public function __construct()
    {
        $this->patterns = [
            "release"     => ["/release\s+=\s+false/", "release=true"],
            "objects"     => ["/window.objects\s+=\s+{}/", "window.objects=" . (string) $_COOKIE["GM__Creator_temp_code"]],
            "game"        => ["/window.game\s+=\s+{}/", "window.game=" . (string) $_COOKIE["GM__Creator_temp_gameInfo"]],
            "afterBuild"  => ["/import\s+(\w+|{})\s+from\s+\".+?;|export\s+default|new\s+App\(runtime\);|\/\/.+?\n/", ""],
            "whitespaces" => ["/\n|\s+/", " "]
        ];

        $this->makeProject();
    }

    private function makeProject() {
        foreach ($this->bundle as $fileName) {
            $scripts = $this->rules[!!strpos($fileName, ".js")];
            $fileName = $this->root . $fileName;
            $file = fopen($fileName, "r");
            $content = fread($file, filesize($fileName));
            $this->content = $this->content . $scripts[0] . $content . $scripts[1];
            fclose($file);
        }

        foreach ($this->patterns as $pattern) {
            $this->content = preg_replace($pattern[0], $pattern[1], $this->content);
        }
    }

    public function __toString()
    {
        return $this->content;
    }
}

echo preg_replace("/\/\*.+?\*\//", "", new Build());