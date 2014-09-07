<?php

$files = array();

if ($handle = opendir('.')) {
  while (false !== ($entry = readdir($handle))) {
    if (strpos($entry, 'web') !== false) {
      array_push($files, $entry);
    }
  }
}
sort($files);
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json; charset=utf-8');
print json_encode($files);

?>
