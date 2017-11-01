<?php

$data = file_get_contents('./count.data');

if (isset($_GET['w'])) {
	$data = explode('/', $data);
	if($_GET['w'] == '1') {
		$data[0] += 1;
	}
	$data[1] += 1;
	$data = $data[0] .'/'. $data[1];
	file_put_contents('./count.data', $data);
}

echo $data;
