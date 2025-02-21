import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const alimentos = [
  { nome: 'Maçã', imagem: 'https://via.placeholder.com/300x300?text=Maçã' },
  { nome: 'Pizza', imagem: 'https://via.placeholder.com/300x300?text=Pizza' },
  { nome: 'Brócolis', imagem: 'https://via.placeholder.com/300x300?text=Brócolis' },
  { nome: 'Sorvete', imagem: 'https://via.placeholder.com/300x300?text=Sorvete' }
];

export default function FlashCards() {
  const [indice, setIndice] = useState(0);
  const controles = useAnimation();

  const handleSwipe = (direcao) => {
    if (direcao === 'direita') {
      console.log(`Gostou de: ${alimentos[indice].nome}`);
    } else {
      console.log(`Não gostou de: ${alimentos[indice].nome}`);
    }
    controles.start({ x: direcao === 'direita' ? 300 : -300, opacity: 0 }).then(() => {
      setIndice((prev) => (prev + 1) % alimentos.length);
      controles.set({ x: 0, opacity: 1 });
    });
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <Card className='w-80 h-96 overflow-hidden shadow-lg relative'>
        <motion.div 
          className='absolute w-full h-full'
          drag='x'
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(e, info) => {
            if (info.offset.x > 100) handleSwipe('direita');
            if (info.offset.x < -100) handleSwipe('esquerda');
          }}
          animate={controles}
        >
          <img src={alimentos[indice].imagem} alt={alimentos[indice].nome} className='w-full h-full object-cover' />
        </motion.div>
      </Card>
    </div>
  );
}
