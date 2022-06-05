<?php

class FileController
{

    public $target_dir;
    public $isCSV;

    public function __construct($target_dir, $isCSV = false)
    {
        $this->target_dir = $target_dir . '/';
        $this->isCSV = $isCSV;
    }

    public function postFile()
    {

        // Hash file name with MD5 for optimization purpuses
        $target_file = hash(hash_algos()[2], basename($_FILES["fileToUpload"]["name"]), false);
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($this->target_dir . $target_file, PATHINFO_EXTENSION));


        if (!$this->isCSV && isset($_POST["submit"])) {
            $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
            if ($check !== false) {
                echo "File is an image - " . $check["mime"] . ".";
                $uploadOk = 1;
            } else {
                return json_encode(array("Upload error:" => "File is not an image."));
                $uploadOk = 0;
            }
        }

        // Check if file already exists
        if (file_exists($this->target_dir . $target_file)) {
            return json_encode(array("Upload error:" => "Sorry, file already exists."));
            $uploadOk = 0;
        }

        // Check file size
        if (!$this->isCSV && $_FILES["fileToUpload"]["size"] > 47000) {
            return json_encode(array("Upload error:" => "Sorry, your file is too large."));
            $uploadOk = 0;
        }

        // Allow certain file formats
        if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg") {
            return json_encode(array("Upload error:" => "Sorry, only JPG, JPEG, PNG & GIF files are allowed."));
            $uploadOk = 0;
        }

        // Check if $uploadOk is set to 0 by an error
        if ($uploadOk == 0) {
            return json_encode(array("Upload error:" => "Sorry, your file was not uploaded."));
            // if everything is ok, try to upload file
        } else {
            if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $this->target_dir . $target_file)) {
                return json_encode(array("Success:" => $target_file));
            } else {
                return json_encode(array("Upload error:" =>  "Sorry, there was an error uploading your file."));
            }
        }
    }

    public function deleteFile($target_file)
    {
        return unlink($this->target_dir . $target_file);
    }
}
