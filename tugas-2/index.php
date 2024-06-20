<?php

// Parent class elang dan harimau
abstract class Hewan
{
    protected $name;
    protected $darah = 50;
    protected $jumlahKaki;
    protected $keahlian;

    public function __construct($name)
    {
        $this->name = $name;
    }

    public function atraksi()
    {
        return "\n{$this->name} sedang {$this->keahlian}";
    }

    abstract public function getInfoHewan();
}

// Class Fight
interface Fight
{
    public function serang($target);
    public function diserang($attacker);
}

// Child class Elang
class Elang extends Hewan implements Fight
{
    private $attackPower;
    private $defencePower;

    public function __construct($name)
    {
        parent::__construct($name);
        $this->jumlahKaki = 2;
        $this->keahlian = "terbang tinggi";
        $this->attackPower = 10;
        $this->defencePower = 5;
    }

    public function getInfoHewan()
    {   
        echo "<br>";
        echo "Name: {$this->name} <br>";
        echo "Darah: {$this->darah} <br>";
        echo "Jumlah Kaki: {$this->jumlahKaki} <br>";
        echo "Keahlian :". $this->atraksi() ."<br>" ;
        echo "Attack Power: {$this->attackPower} <br>";
        echo "Defence Power: {$this->defencePower} <br>";
    }

    public function serang($target)
    {
        echo "<br>";
        echo "{$this->name} sedang menyerang {$target->getName()}\n";
        echo "<br>";
        $target->diserang($this);
    }

    public function diserang($attacker)
    {
        echo "<br>";
        echo "{$this->name} sedang diserang {$attacker->getName()}";
        $this->darah -= $attacker->getAttackPower() / $this->defencePower;
    }

    public function getAttackPower()
    {
        return $this->attackPower;
    }

    public function getName()
    {
        return $this->name;
    }
}

// Child class Harimau
class Harimau extends Hewan implements Fight
{
    private $attackPower;
    private $defencePower;

    public function __construct($name)
    {
        parent::__construct($name);
        $this->jumlahKaki = 4;
        $this->keahlian = "lari cepat";
        $this->attackPower = 7;
        $this->defencePower = 8;
    }

    public function getInfoHewan()
    {   
        echo "<br>";
        echo "Name: {$this->name} <br>";
        echo "Darah: {$this->darah} <br>";
        echo "Jumlah Kaki: {$this->jumlahKaki} <br>";
        echo "Keahlian :". $this->atraksi() ."<br>" ;
        echo "Attack Power: {$this->attackPower} <br>";
        echo "Defence Power: {$this->defencePower} <br>";
    }

    public function serang($target)
    {
        echo "<br>";
        echo "{$this->name} sedang menyerang {$target->getName()}\n";
        $target->diserang($this);
    }

    public function diserang($attacker)
    {
        echo "{$this->name} sedang diserang\n";
        $this->darah -= $attacker->getAttackPower() / $this->defencePower;
    }

    public function getAttackPower()
    {
        return $this->attackPower;
    }

    public function getName()
    {
        return $this->name;
    }
}

// Contoh penggunaan
$elang = new Elang("Elang");
$harimau = new Harimau("Harimau");

// Output Elang dan Harimau
$elang->getInfoHewan();
$harimau->getInfoHewan();

// Output info ketika Harimau menyerang Elang
$harimau->serang($elang);
$elang->getInfoHewan();

// Output info ketika Elang menyerang Harimau
$elang->serang($harimau);
$harimau->getInfoHewan();

?>