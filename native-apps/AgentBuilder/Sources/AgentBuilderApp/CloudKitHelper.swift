// CloudKitHelper.swift — lightweight CloudKit scaffolding (PoC)
import Foundation
import CloudKit

public class CloudKitHelper {
    public static let shared = CloudKitHelper()
    public let container: CKContainer
    public let privateDB: CKDatabase

    private init() {
        container = CKContainer.default()
        privateDB = container.privateCloudDatabase
    }

    public func saveRecord(_ record: CKRecord, completion: @escaping (Result<CKRecord, Error>) -> Void) {
        privateDB.save(record) { rec, err in
            if let err = err { completion(.failure(err)); return }
            completion(.success(rec!))
        }
    }
}
