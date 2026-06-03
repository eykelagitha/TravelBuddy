// Gambar disimpan LOKAL di assets/destinations/ — tidak butuh internet, 100% jalan di Expo Go
const destinations = [
  {
    id: 1,
    name: 'Danau Toba',
    location: 'Sumatera Utara',
    price: 350000,
    image: require('../../assets/destinations/danau_toba.png'),
    description:
      'Danau vulkanik terbesar di dunia dengan pemandangan menakjubkan. Dikelilingi perbukitan hijau dan budaya Batak yang kaya. Nikmati sunset di Samosir Island dan kuliner khas seperti arsik ikan mas.',
    rating: 4.8,
    category: 'Nature',
  },
  {
    id: 2,
    name: 'Raja Ampat',
    location: 'Papua Barat',
    price: 2500000,
    image: require('../../assets/destinations/raja_ampat.png'),
    description:
      'Surga bawah laut dengan keanekaragaman hayati tertinggi di dunia. Lebih dari 1.500 spesies ikan dan 600 jenis karang. Destinasi impian para penyelam dari seluruh dunia.',
    rating: 4.9,
    category: 'Beach',
  },
  {
    id: 3,
    name: 'Borobudur',
    location: 'Magelang, Jawa Tengah',
    price: 450000,
    image: require('../../assets/destinations/borobudur.png'),
    description:
      'Candi Buddha terbesar di dunia dan warisan budaya UNESCO. Dibangun abad ke-9 dengan 2.672 panel relief dan 504 arca Buddha. Sunrise dari puncak candi sangat memukau.',
    rating: 4.7,
    category: 'Culture',
  },
  {
    id: 4,
    name: 'Bali',
    location: 'Bali',
    price: 800000,
    image: require('../../assets/destinations/bali.png'),
    description:
      'Pulau dewata dengan keindahan alam, budaya Hindu unik, dan kehidupan malam yang ramai. Kunjungi Tanah Lot, Ubud, serta pantai eksotis Kuta, Seminyak, dan Nusa Dua.',
    rating: 4.9,
    category: 'Beach',
  },
  {
    id: 5,
    name: 'Komodo',
    location: 'NTT',
    price: 1200000,
    image: require('../../assets/destinations/komodo.png'),
    description:
      'Rumah bagi komodo, kadal terbesar di dunia. Taman Nasional Komodo situs UNESCO dengan alam dramatis. Snorkeling di Pink Beach dengan pasir merah muda yang langka.',
    rating: 4.6,
    category: 'Nature',
  },
  {
    id: 6,
    name: 'Yogyakarta',
    location: 'DI Yogyakarta',
    price: 300000,
    image: require('../../assets/destinations/yogyakarta.png'),
    description:
      'Kota budaya dengan Keraton, Prambanan, dan seni batik terkenal. Nikmati gudeg, bakpia, dan sate klathak. Jalan Malioboro adalah surga belanja oleh-oleh.',
    rating: 4.7,
    category: 'Culture',
  },
  {
    id: 7,
    name: 'Labuan Bajo',
    location: 'NTT',
    price: 950000,
    image: require('../../assets/destinations/labuan_bajo.png'),
    description:
      'Gerbang Taman Nasional Komodo dengan sunset laut yang memukau. Hiking ke Pulau Padar untuk panorama tiga teluk berwarna tosca, hijau, dan biru tua yang ikonik.',
    rating: 4.8,
    category: 'Beach',
  },
  {
    id: 8,
    name: 'Bromo',
    location: 'Jawa Timur',
    price: 500000,
    image: require('../../assets/destinations/bromo.png'),
    description:
      'Gunung berapi aktif dengan lautan pasir yang mistis. Sunrise dari puncak Penanjakan tak terlupakan. Berkuda melintasi savana menuju kawah aktif yang masih mengeluarkan asap.',
    rating: 4.8,
    category: 'Nature',
  },
];

export default destinations;
