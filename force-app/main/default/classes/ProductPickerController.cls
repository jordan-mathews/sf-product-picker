public with sharing class ProductPickerController {
  @AuraEnabled(cacheable=true)
  public static List<Product2> searchProducts(String searchTerm) {
    String key = '%' + searchTerm + '%';
    System.debug(key);
    return [
      SELECT Id, Name
      FROM Product2
      WHERE Name LIKE :key
      WITH SECURITY_ENFORCED
      LIMIT 10
    ];
  }

  @AuraEnabled(cacheable=true)
  public static List<PriceBookEntry> getPriceBookEntries(String priceBookName) {
    return [
      SELECT Id, ProductCode, UnitPrice, Product2.Name
      FROM PriceBookEntry
      WHERE PriceBook2.Name = :priceBookName
      WITH SECURITY_ENFORCED
    ];
  }
}
