const express = require('express');
const router = express.Router();

let fasilitas = [
    {
        id: 1, 
        id_kolam: 101, 
        nama_fasilitas: "Kolam Renang"
    },
    {
        id: 2, 
        id_kolam: 102, 
        nama_fasilitas: "Sauna"
    },
    {
        id: 3, 
        id_kolam: 103, 
        nama_fasilitas: "Gimnasium"
    },
];

router.get('/', (req, res) => {res.json(fasilitas);});
router.post('/', (req, res)=>{
    const newkolamrenang = {
        id: fasilitas.length + 1,
        task: req.body.task,
        completed: false
    };
    fasilitas.push(newkolamrenang);
    res.status(201).json(newkolamrenang);
})
module.exports = router;

router.delete('/:id',(req, res) => {
    const kolamrenangIndexIndex = fasilitas.findIndex(t=> t.id === parseInt(req.params.id));
    if(kolamrenangIndex===-1)return res.status(404).json({Message: 'kolam tidak ditemukan'});

    const deletedkolamrenang = fasilitas.splice(kolamrenangIndexIndex,1)[0];
    res.status(200).json({Message: `Tugas' ${deletedkolamrenang.task}'telah dihapus`});
})

router.put('/:id',(req, res) => {
    const kolamrenang = fasilitas.find(t=> t.id === parseInt(req.params.id));
    if(!kolamrenang)return res.status(404).json({Message: 'kolam tidak ditemukan'});
    kolamrenang.task = req.body.task || kolamrenang.task

    res.status(201).json({
        Message: Tugas`dengan ID ${kolamrenang.id}telah diperbarui`,
        updatedkolamrenang:kolamrenang
    });
})

module.exports =router;