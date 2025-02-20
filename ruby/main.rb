require 'nokogiri'
require 'open-uri'
require 'uri'
require 'net/http'
require 'sequel'
require 'sqlite3'

# Ustawienia bazy danych SQLite
DB = Sequel.connect('sqlite://products.db')

# Tworzenie tabeli, jeśli nie istnieje
DB.create_table? :products do
  primary_key :id
  String :name
  String :price
  String :link
  String :rating
  String :availability
  String :description
end

# Funkcja do otwierania strony produktu i zbierania szczegółów
def fetch_product_details(product_url)
    begin
      headers = { 'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36' }
      doc = Nokogiri::HTML(URI.open(product_url, headers))
  
      # Zbieranie szczegółowych informacji o produkcie
      name = doc.at_css('span#productTitle')&.text&.strip || "Brak nazwy"
      rating = doc.at_css('span[data-asin="B084T1X4TY"]')&.text&.strip || "Brak oceny"
      availability = doc.at_css('#availability span.a-declarative')&.text&.strip || "Brak informacji o dostępności"
      description = doc.at_css('#productDescription p')&.text&.strip || "Brak opisu"
  
      return {
        name: name,
        rating: rating,
        availability: availability,
        description: description
      }
    rescue => e
      puts "Error fetching product details: #{e.message}"
      return nil
    end
  end

# Funkcja do otwierania strony wyników wyszukiwania i zbierania produktów
# Funkcja do otwierania strony wyników wyszukiwania i zbierania produktów
def fetch_amazon_products(search_term)
    # Sprawdzenie, czy podano hasło
    if search_term.nil? || search_term.empty?
      puts "Proszę podać hasło wyszukiwania."
      exit
    end
  
    # Kodowanie hasła wyszukiwania do URL
    encoded_search_term = URI.encode_www_form_component(search_term)
  
    # Tworzenie URL wyszukiwania na Amazonie
    url = "https://www.amazon.pl/s?k=#{encoded_search_term}"
  
    # Otwieranie strony wyników
    headers = { 'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36' }
    doc = Nokogiri::HTML(URI.open(url, headers))
  
    # Zbieranie produktów
    doc.css('[data-component-type="s-search-result"]').each do |result|
      product_name = result.at_css('a > h2 > span')&.text.strip
      price = result.at_css('.a-offscreen')&.text&.strip || "Brak ceny"  # Dodajemy zabezpieczenie
      product_link = "https://www.amazon.pl" + result.at_css('a')[:href]
  
      # Zbieranie szczegółowych danych o produkcie
      product_details = fetch_product_details(product_link)
  
      # Zapisanie do bazy danych
      if product_details
        DB[:products].insert(
          name: product_name,
          price: price,
          link: product_link,
          rating: product_details[:rating],
          availability: product_details[:availability],
          description: product_details[:description]
        )
  
        puts "Zapisano produkt: #{product_name}, cena: #{price}"
      end
    end
  end
  

# Główne wywołanie: Pobieranie danych na podstawie wyszukiwanego hasła
print "Podaj hasło do wyszukiwania: "
search_term = gets.chomp

# Pobieranie danych o produktach
fetch_amazon_products(search_term)
