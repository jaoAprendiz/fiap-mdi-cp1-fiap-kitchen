import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCarrinho } from '../context/CarrinhoContext';

const PRODUTOS = [
  {
    id: '1',
    nome: 'Brigadeiro Gourmet',
    descricao: '45g - Feito com chocolate belga 70% cacau e granulado crocante',
    preco: 5.50,
    imagem: require('../assets/brigadeiro.jpg'),
  },
  {
    id: '2',
    nome: 'Fatia de Bolo de Cenoura',
    descricao: '150g - Massa fofinha com cobertura generosa de chocolate',
    preco: 10.00,
    imagem: require('../assets/bolo_cenoura.jpg'),
  },
  {
    id: '3',
    nome: 'Pudim de Leite',
    descricao: '120g - Pudim cremoso com calda de caramelo artesanal',
    preco: 9.00,
    imagem: require('../assets/pudim.jpg'),
  },
];

export default function Sobremesas() {
  const router = useRouter();
  const { carrinho, alterarQuantidade } = useCarrinho();

  const totalItens = Object.values(carrinho).reduce((acc, curr) => acc + curr, 0);
  const valorTotal = PRODUTOS.reduce((acc, produto) => {
    const qtd = carrinho[produto.id] || 0;
    return acc + (qtd * produto.preco);
  }, 0);

  const totalFormatado = valorTotal.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light"/>
      
      <ImageBackground source={require('../assets/backgroundImage.png')} style={styles.container} resizeMode="cover">
        
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.canGoBack() ? router.back() : router.replace('/cardapio')}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Sobremesas</Text>
            <Text style={styles.headerSubtitle}>{totalItens} itens</Text>
          </View>
        </View>

        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
        >
          {PRODUTOS.map((produto) => {
            const qtd = carrinho[produto.id] || 0;
            return (
              <View key={produto.id} style={styles.card}>
                <Image source={produto.imagem} style={styles.productImage} resizeMode="cover" />
                
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{produto.nome}</Text>
                  <Text style={styles.productDescription}>{produto.descricao}</Text>
                  <Text style={styles.productPrice}>
                    {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </Text>
                </View>

                {qtd === 0 ? (
                  <TouchableOpacity 
                    style={styles.addButtonSmall} 
                    onPress={() => alterarQuantidade(produto.id, 'soma')}
                  >
                    <Ionicons name="add" size={20} color="#fff" />
                  </TouchableOpacity>
                ) : (
                  <View style={styles.counterContainer}>
                    <TouchableOpacity 
                      style={styles.counterButton} 
                      onPress={() => alterarQuantidade(produto.id, 'sub')}
                    >
                      <Ionicons name="remove" size={18} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.counterText}>{qtd}</Text>
                    <TouchableOpacity 
                      style={styles.addButtonSmall} 
                      onPress={() => alterarQuantidade(produto.id, 'soma')}
                    >
                      <Ionicons name="add" size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total do pedido</Text>
            <Text style={styles.totalValue}>{totalFormatado}</Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.cartButton, totalItens === 0 && styles.cartButtonDisabled]}
            disabled={totalItens === 0}
            activeOpacity={0.8}
            onPress={() => router.push('/carrinho')}
          >
            <Ionicons 
              name="cart-outline" 
              size={24} 
              color={totalItens === 0 ? "#777" : "#fff"} 
              style={{ marginRight: 8 }} 
            />
            <Text style={[styles.cartButtonText, totalItens === 0 && { color: '#777' }]}>
              Ver carrinho({totalItens})
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#000' 
  },
  container: { 
    flex: 1, 
    backgroundColor: '#000' 
  },
  header: { 
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: { 
    backgroundColor: '#151515', 
    padding: 10, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#252525' 
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  headerTitle: { 
    color: '#fff', 
    fontSize: 24, 
    fontWeight: 'bold' 
  },
  headerSubtitle: { 
    color: '#888', 
    fontSize: 14 
  },
  scrollContent: { 
    paddingHorizontal: 20,
    paddingBottom: 20 
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#151515',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  productImage: { 
    width: 80, 
    height: 80, 
    borderRadius: 12 
  },
  productInfo: { 
    flex: 1, 
    marginLeft: 12 
  },
  productName: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  productDescription: { 
    color: '#888', 
    fontSize: 11, 
    marginVertical: 4 
  },
  productPrice: { 
    color: '#E83D84', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  addButtonSmall: { 
    backgroundColor: '#E83D84', 
    width: 32, 
    height: 32, 
    borderRadius: 16, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  counterContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#000', 
    borderRadius: 25, 
    padding: 4, 
    borderWidth: 1, 
    borderColor: '#252525' 
  },
  counterButton: { 
    width: 28, 
    height: 28, 
    backgroundColor: '#222', 
    borderRadius: 14, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  counterText: { 
    color: '#fff', 
    marginHorizontal: 12, 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  footer: { 
    padding: 20, 
    borderTopWidth: 1, 
    borderTopColor: '#151515',
    backgroundColor: '#000'
  },
  totalRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 16 
  },
  totalLabel: { 
    color: '#fff', 
    fontSize: 16 
  },
  totalValue: { 
    color: '#E83D84', 
    fontSize: 22, 
    fontWeight: 'bold' 
  },
  cartButton: { 
    backgroundColor: '#E83D84', 
    flexDirection: 'row', 
    height: 58, 
    borderRadius: 18, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  cartButtonDisabled: { 
    backgroundColor: '#222' 
  },
  cartButtonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
});